import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_EVENTS, INITIAL_TASKS, INITIAL_ANNOUNCEMENTS, INITIAL_ISSUES, ROLE_DEFINITIONS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load state from localStorage or initial mock data
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('eventops_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentEvent, setCurrentEvent] = useState(() => {
    const saved = localStorage.getItem('eventops_event');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS[0];
  });

  // Default logged in user: Anshif (Event Head - matches screenshots!)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('eventops_current_user');
    if (saved) return JSON.parse(saved);
    return INITIAL_USERS[0]; // Anshif
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('eventops_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('eventops_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('eventops_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('eventops_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('eventops_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eventops_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('eventops_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('eventops_issues', JSON.stringify(issues));
  }, [issues]);

  // Auth Operations
  const login = (email, password) => {
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'Invalid college email or password. Try preset role logins below!' };
  };

  const loginAsRole = (roleKey) => {
    const userForRole = users.find(u => u.role === roleKey);
    if (userForRole) {
      setCurrentUser(userForRole);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eventops_current_user');
  };

  // QR & Attendance Operations
  const getUserByToken = (token) => {
    return users.find(u => u.token === token || u.id === token) || null;
  };

  const toggleCheckIn = (userId) => {
    setUsers(prevUsers => {
      const updated = prevUsers.map(u => {
        if (u.id === userId) {
          const nextState = !u.isCheckedIn;
          return {
            ...u,
            isCheckedIn: nextState,
            checkInTime: nextState ? new Date().toISOString() : null
          };
        }
        return u;
      });

      // Update current event stats
      const totalChecked = updated.filter(u => u.isCheckedIn && u.eventId === currentEvent.id).length;
      setCurrentEvent(prev => ({
        ...prev,
        checkedInMembers: totalChecked
      }));

      return updated;
    });

    // Update currentUser if modifying logged in user
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        isCheckedIn: !prev.isCheckedIn,
        checkInTime: !prev.isCheckedIn ? new Date().toISOString() : null
      }));
    }
  };

  const regenerateQR = (userId) => {
    const newToken = `EVT26-TEAM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          token: newToken,
          qrRegeneratedCount: (u.qrRegeneratedCount || 0) + 1
        };
      }
      return u;
    }));

    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        token: newToken,
        qrRegeneratedCount: (prev.qrRegeneratedCount || 0) + 1
      }));
    }

    return newToken;
  };

  // Task Operations
  const addTask = (taskData) => {
    const newTask = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      ...taskData,
      status: 'PENDING',
      createdBy: currentUser?.name || 'Admin',
      eventId: currentEvent.id
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  // Issue Operations
  const reportIssue = (issueData) => {
    const newIssue = {
      id: `iss-${Date.now().toString().slice(-4)}`,
      ...issueData,
      status: 'OPEN',
      reportedBy: currentUser?.name || 'Anonymous',
      reportedById: currentUser?.id || '',
      timestamp: new Date().toISOString()
    };
    setIssues(prev => [newIssue, ...prev]);
  };

  const updateIssueStatus = (issueId, newStatus, assignedTo) => {
    setIssues(prev => prev.map(i => {
      if (i.id === issueId) {
        return {
          ...i,
          status: newStatus,
          assignedTo: assignedTo || i.assignedTo
        };
      }
      return i;
    }));
  };

  // Announcement Operations
  const addAnnouncement = (title, content, isPinned = false, priority = 'NORMAL') => {
    const newAnn = {
      id: `anc-${Date.now().toString().slice(-4)}`,
      title,
      content,
      author: currentUser?.name || 'Faculty Office',
      authorRole: currentUser ? ROLE_DEFINITIONS[currentUser.role]?.name : 'Coordinator',
      timestamp: new Date().toISOString(),
      isPinned,
      priority
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  // Add Member Operation (Admin)
  const addMember = (memberData) => {
    const newMember = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      token: `EVT26-TEAM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      password: 'password123',
      eventId: currentEvent.id,
      isCheckedIn: false,
      checkInTime: null,
      assignedTasksCount: 0,
      completedTasksCount: 0,
      qrRegeneratedCount: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      heroAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      ...memberData
    };
    setUsers(prev => [...prev, newMember]);
    return newMember;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentEvent,
        users,
        tasks,
        announcements,
        issues,
        ROLE_DEFINITIONS,
        login,
        loginAsRole,
        logout,
        getUserByToken,
        toggleCheckIn,
        regenerateQR,
        addTask,
        updateTaskStatus,
        reportIssue,
        updateIssueStatus,
        addAnnouncement,
        addMember
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
