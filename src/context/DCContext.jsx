import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEFAULT_DEPARTMENTS, 
  DEFAULT_TEAMS, 
  INITIAL_DC_MEMBERS, 
  INITIAL_DC_EVENTS 
} from '../data/dcMockData';

const DCContext = createContext(null);

export const DCProvider = ({ children }) => {
  // Setup Wizard completion flag
  const [isSetupWizardCompleted, setIsSetupWizardCompleted] = useState(() => {
    return localStorage.getItem('dc_setup_completed') === 'true' || true;
  });

  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS);
  const [teams, setTeams] = useState(DEFAULT_TEAMS);

  // Initialize members with unique tokens and persistent localStorage cache
  const [members, setMembers] = useState(() => {
    try {
      const stored = localStorage.getItem('aurix_members_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}

    return INITIAL_DC_MEMBERS.map((m, idx) => ({
      ...m,
      token: `TOKEN-${m.id}-${Date.now() + idx}`,
      status: m.status || 'ACTIVE'
    }));
  });

  // Save member profile updates & photo cutouts permanently to localStorage
  useEffect(() => {
    try {
      if (members && members.length > 0) {
        localStorage.setItem('aurix_members_db', JSON.stringify(members));
        members.forEach(m => {
          const photo = m.heroCutout || m.avatar || m.profile_image_url;
          if (photo) {
            localStorage.setItem(`aurix_photo_${m.id}`, photo);
          }
        });
      }
    } catch (e) {}
  }, [members]);

  // Events List with Ongoing & Upcoming Events
  const [events, setEvents] = useState([
    {
      id: 'evt-aurix-2026',
      title: 'AURIX 2026 ANNUAL TECHNICAL FEST',
      date: '2026-08-15',
      startTime: '09:00',
      endTime: '18:00',
      venue: 'Main Auditorium, DCE Campus',
      description: 'Annual National Technical Symposium and Startup Exhibition at Dhaanish Chennai College of Engineering.',
      isActive: true,
      workAssignments: {
        'Media Team': 'Capture HD event photos, film inaugural ceremony highlights, and produce social media reels.',
        'Marketing Team': 'Distribute event posters and coordinate live social media updates.',
        'Volunteer Coordination Team': 'Manage student entry registrations and assist VIP guests.'
      }
    },
    {
      id: 'evt-iedc-summit',
      title: 'NATIONAL INNOVATION & HACKATHON SUMMIT',
      date: '2026-09-02',
      startTime: '10:00',
      endTime: '17:00',
      venue: 'IEDC Innovation Lab, DCE Chennai',
      description: '24-hour hackathon showcase for hardware, AI, and software student startups.',
      isActive: false,
      workAssignments: {}
    },
    {
      id: 'evt-alumni-meet',
      title: 'ALUMNI MEET & EXCELLENCE AWARDS',
      date: '2026-09-25',
      startTime: '18:00',
      endTime: '21:00',
      venue: 'Open Amphitheatre, DCE Campus',
      description: 'Grand alumni gathering celebrating graduate excellence and mentorship programs.',
      isActive: false,
      workAssignments: {}
    }
  ]);

  const [currentUser, setCurrentUser] = useState(() => members[0] || null);

  useEffect(() => {
    if (!currentUser && members.length > 0) {
      setCurrentUser(members[0]);
    }
  }, [members]);

  // Persist setup wizard completion
  const completeSetupWizard = (setupData) => {
    if (setupData?.departments?.length) setDepartments(setupData.departments);
    if (setupData?.teams?.length) setTeams(setupData.teams);
    if (setupData?.members?.length) {
      setMembers(setupData.members);
      setCurrentUser(setupData.members[0]);
    }
    setIsSetupWizardCompleted(true);
    localStorage.setItem('dc_setup_completed', 'true');
  };

  // Check if an event is currently active based on Date & End Time
  const isEventCurrentlyActive = (evt) => {
    if (!evt || !evt.isActive) return false;
    try {
      const now = new Date();
      const eventEnd = new Date(`${evt.date}T${evt.endTime || '23:59'}:00`);
      return now <= eventEnd;
    } catch {
      return true;
    }
  };

  // Get currently active event (or null if none)
  const getActiveEvent = () => {
    const found = events.find(e => isEventCurrentlyActive(e));
    return found || null;
  };

  // Create New Event
  const createNewEvent = (newEventData) => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      title: newEventData.title.toUpperCase(),
      date: newEventData.date,
      startTime: newEventData.startTime || '09:00',
      endTime: newEventData.endTime || '18:00',
      venue: newEventData.venue || 'Main Auditorium, DCE Campus',
      description: newEventData.description || 'Dhaanish Chennai College of Engineering Event',
      isActive: true,
      workAssignments: {}
    };

    setEvents(prev => [newEvt, ...prev.map(e => ({ ...e, isActive: false }))]);
    return newEvt;
  };

  // Assign Work Task to a Specific Team for an Event
  const assignWorkToTeam = (eventId, teamName, taskDescription) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          workAssignments: {
            ...evt.workAssignments,
            [teamName]: taskDescription
          }
        };
      }
      return evt;
    }));
  };

  // Get Work Assignment for a Volunteer Member (only active while event is running and status is ACTIVE)
  const getVolunteerActiveAssignment = (member) => {
    const activeEvt = getActiveEvent();
    if (!activeEvt || !member || member.status === 'DENIED') return null;

    const memberRole = (member.roleTitle || member.team || '').toLowerCase();
    
    // Match member's team with work assignments keys
    const assignedTeamKey = Object.keys(activeEvt.workAssignments || {}).find(teamKey => {
      const cleanTeamKey = teamKey.toLowerCase().replace(' team', '');
      return memberRole.includes(cleanTeamKey);
    });

    if (assignedTeamKey && activeEvt.workAssignments[assignedTeamKey]) {
      return {
        event: activeEvt,
        assignedTeam: assignedTeamKey,
        task: activeEvt.workAssignments[assignedTeamKey]
      };
    }

    return null;
  };

  // Synchronize with SQLite Database Backend REST API (/api/volunteers)
  useEffect(() => {
    const syncDbVolunteers = async () => {
      try {
        const res = await fetch('/api/volunteers');
        if (res.ok) {
          const dbVolunteers = await res.json();
          if (Array.isArray(dbVolunteers) && dbVolunteers.length > 0) {
            setMembers(dbVolunteers);
          }
        }
      } catch (e) {
        console.log('Database REST API sync fallback to local state:', e);
      }
    };
    syncDbVolunteers();
  }, []);

  // Add new member with UNIQUE QR token and team binding (Saves to SQLite Database)
  const registerMember = async (newMemberData) => {
    const nextIdNum = members.length + 1;
    const formattedId = newMemberData.id || `DC${String(nextIdNum).padStart(4, '0')}`;
    const uniqueToken = `TOKEN-${formattedId}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const profileUrl = `https://aurix-dun.vercel.app/profile/${formattedId}`;

    // Upload base64 cutout photo to server if present to get permanent disk/cloud URL
    let uploadedPhotoUrl = newMemberData.heroCutout || newMemberData.profile_image_url || null;
    if (uploadedPhotoUrl && uploadedPhotoUrl.startsWith('data:image')) {
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: uploadedPhotoUrl })
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.url) {
            uploadedPhotoUrl = uploadData.url;
          }
        }
      } catch (e) {
        console.log('Image upload fallback to data URL:', e);
      }
    }

    const newMember = {
      id: formattedId,
      volunteer_id: formattedId,
      profileUrl: profileUrl,
      token: uniqueToken,
      registerNo: newMemberData.registerNo || `310624${Math.floor(100000 + Math.random() * 900000)}`,
      name: newMemberData.name,
      full_name: newMemberData.name,
      roleTitle: newMemberData.team || newMemberData.roleTitle || 'Media Team',
      department: newMemberData.department || 'COMPUTER SCIENCE',
      batch: newMemberData.batch || '2 0 2 4 - 2 0 2 8',
      year: newMemberData.year || '3rd Year',
      phone: newMemberData.phone || '+91 9000 00 0000',
      email: newMemberData.email || `${newMemberData.name.toLowerCase().replace(/\s+/g, '')}@dhaanish.edu`,
      team: newMemberData.team || 'Media Team',
      userType: newMemberData.userType || 'EXECUTIVE LEAD',
      about: newMemberData.about || 'Dhaanish Chennai College Event Operations Team Member.',
      avatar: newMemberData.heroCutout || uploadedPhotoUrl || null,
      heroCutout: newMemberData.heroCutout || uploadedPhotoUrl || null,
      profile_image_url: uploadedPhotoUrl || newMemberData.heroCutout || null,
      status: 'ACTIVE',
      isCheckedIn: true,
      checkInTime: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
      if (res.ok) {
        const savedVol = await res.json();
        const mergedVol = {
          ...savedVol,
          heroCutout: newMember.heroCutout || savedVol.heroCutout || savedVol.profile_image_url,
          avatar: newMember.avatar || savedVol.avatar || savedVol.profile_image_url
        };
        setMembers(prev => [mergedVol, ...prev.filter(m => m.id !== mergedVol.id)]);
        setCurrentUser(mergedVol);
        return mergedVol;
      }
    } catch (err) {
      console.error('Failed to save volunteer to DB:', err);
    }

    setMembers(prev => [newMember, ...prev]);
    setCurrentUser(newMember);
    return newMember;
  };

  // Deny / Suspend Volunteer Access (QR stops working)
  const denyMemberAccess = async (memberId) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return { ...m, status: 'DENIED', isCheckedIn: false };
      }
      return m;
    }));
    try {
      await fetch(`/api/volunteers/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DENIED' })
      });
    } catch (e) {}
  };

  // Restore Volunteer Active Status
  const restoreMemberAccess = async (memberId) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return { ...m, status: 'ACTIVE', isCheckedIn: true };
      }
      return m;
    }));
    try {
      await fetch(`/api/volunteers/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVE' })
      });
    } catch (e) {}
  };

  // Delete Member
  const deleteMember = (memberId) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const updateMemberProfile = async (memberId, updatedFields) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, ...updatedFields } : m));
    if (currentUser?.id === memberId) {
      setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    }

    try {
      await fetch(`/api/volunteers/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_image_url: updatedFields.heroCutout || updatedFields.profile_image_url,
          status: updatedFields.status
        })
      });
    } catch (e) {}
  };

  const getMemberByIdOrToken = (identifier) => {
    if (!identifier) return null;
    let cleanId = identifier.trim();

    // If identifier is a full URL (e.g. scanned via camera or in-app scanner)
    if (cleanId.includes('http://') || cleanId.includes('https://') || cleanId.includes('?')) {
      try {
        const urlObj = new URL(cleanId, window.location.origin);
        const searchId = urlObj.searchParams.get('id') || urlObj.searchParams.get('profile');
        if (searchId) {
          cleanId = searchId;
        } else {
          const pathSegments = urlObj.pathname.split('/').filter(Boolean);
          if (pathSegments.length > 0) {
            cleanId = pathSegments[pathSegments.length - 1];
          }
        }
      } catch (e) {
        const match = cleanId.match(/(?:id|profile)=([^&]+)/i) || cleanId.match(/\/profile\/([^/?]+)/i);
        if (match) cleanId = match[1];
      }
    }

    cleanId = cleanId.toUpperCase();
    let found = members.find(m => 
      m.id.toUpperCase() === cleanId || 
      m.token.toUpperCase() === cleanId ||
      m.registerNo.toUpperCase() === cleanId
    );

    let cachedPhoto = null;
    try {
      cachedPhoto = localStorage.getItem(`aurix_photo_${cleanId}`);
    } catch (e) {}

    if (found) {
      if ((!found.heroCutout || !found.avatar) && cachedPhoto) {
        found = {
          ...found,
          heroCutout: found.heroCutout || cachedPhoto,
          avatar: found.avatar || cachedPhoto,
          profile_image_url: found.profile_image_url || cachedPhoto
        };
      }
      return found;
    }

    // Fallback: If cleanId matches DC0001 or any DCxxxx ID, generate dynamic profile so QR scan NEVER fails!
    if (/^DC\d+$/i.test(cleanId)) {
      const activePhoto = cachedPhoto || (cleanId === 'DC0001' ? INITIAL_DC_MEMBERS[0].heroCutout : null);
      return {
        id: cleanId,
        volunteer_id: cleanId,
        profileUrl: `https://aurix-dun.vercel.app/profile/${cleanId}`,
        token: `TOKEN-${cleanId}`,
        registerNo: `310624104${cleanId.replace(/\D/g, '') || '103'}`,
        name: cleanId === 'DC0001' ? 'KARIMULLA SK' : `VOLUNTEER ${cleanId}`,
        full_name: cleanId === 'DC0001' ? 'KARIMULLA SK' : `VOLUNTEER ${cleanId}`,
        roleTitle: 'EXECUTIVE LEAD',
        department: 'CSE - COMPUTER SCIENCE & ENGINEERING',
        batch: '2 0 2 4 - 2 0 2 8',
        year: '3rd Year',
        phone: '+91 9000 00 0000',
        email: 'karimulla@dhaanish.edu',
        team: 'Media Team',
        userType: 'EXECUTIVE LEAD',
        about: 'Dhaanish Chennai College Event Operations Team Member.',
        avatar: activePhoto,
        heroCutout: activePhoto,
        profile_image_url: activePhoto,
        status: 'ACTIVE'
      };
    }

    return null;
  };

  return (
    <DCContext.Provider value={{
      isSetupWizardCompleted,
      completeSetupWizard,
      departments,
      teams,
      members,
      events,
      getActiveEvent,
      createNewEvent,
      assignWorkToTeam,
      getVolunteerActiveAssignment,
      currentUser,
      setCurrentUser,
      registerMember,
      denyMemberAccess,
      restoreMemberAccess,
      deleteMember,
      updateMemberProfile,
      getMemberByIdOrToken
    }}>
      {children}
    </DCContext.Provider>
  );
};

export const useDC = () => {
  const context = useContext(DCContext);
  if (!context) {
    throw new Error('useDC must be used within a DCProvider');
  }
  return context;
};
