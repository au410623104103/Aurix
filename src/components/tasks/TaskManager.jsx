import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Layers,
  ChevronDown,
  X
} from 'lucide-react';

export const TaskManager = ({ isModalOpen, setIsModalOpen }) => {
  const { tasks, users, addTask, updateTaskStatus, currentUser, ROLE_DEFINITIONS } = useAuth();
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDept, setNewTaskDept] = useState('Technical Operations');
  const [newTaskPriority, setNewTaskPriority] = useState('HIGH');
  const [newTaskAssigneeId, setNewTaskAssigneeId] = useState(users[0]?.id || '');
  const [newTaskDeadline, setNewTaskDeadline] = useState('11:00 AM');

  const filteredTasks = tasks.filter(t => {
    const matchesDept = filterDept === 'ALL' || t.department === filterDept;
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assignedUser = users.find(u => u.id === newTaskAssigneeId) || users[0];

    addTask({
      title: newTaskTitle,
      description: newTaskDesc,
      department: newTaskDept,
      priority: newTaskPriority,
      assignedTo: assignedUser.name,
      assignedToId: assignedUser.id,
      deadline: `Today ${newTaskDeadline}`
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsModalOpen(false);
  };

  const departments = ['Technical Operations', 'Media & Communications', 'Stage & Sound', 'Guest Relations', 'Security & Medical'];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            <span>Task Operations Board</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Assign, monitor, and update ground execution tasks across event departments</p>
        </div>

        {(currentUser?.role === 'ADMIN' || currentUser?.role === 'EVENT_COORDINATOR' || currentUser?.role === 'EVENT_HEAD') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-950 p-4 rounded-xl border border-gray-800">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or assignee..."
            className="w-full bg-gray-900 border border-gray-800 text-gray-200 text-xs pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="text-gray-400 font-semibold">Department:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-200 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="text-gray-400 font-semibold">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-200 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

      </div>

      {/* Task List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="glass-card rounded-2xl p-5 border border-gray-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${
                  task.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                  task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                  'bg-blue-500/20 text-blue-400 border-blue-500/40'
                }`}>
                  {task.priority} PRIORITY
                </span>

                <span className="text-[10px] text-gray-400 font-mono">{task.department}</span>
              </div>

              <h3 className="text-sm font-extrabold text-white leading-snug">{task.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{task.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <strong className="text-gray-200">{task.assignedTo}</strong>
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{task.deadline}</span>
                </span>
              </div>

              {/* Status Update Buttons */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-[10px] text-gray-500">Status:</span>
                <div className="flex items-center gap-1">
                  {['PENDING', 'IN_PROGRESS', 'COMPLETED'].map(st => (
                    <button
                      key={st}
                      onClick={() => updateTaskStatus(task.id, st)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                        task.status === st
                          ? st === 'COMPLETED' ? 'bg-emerald-500 text-white' :
                            st === 'IN_PROGRESS' ? 'bg-cyan-500 text-white' :
                            'bg-amber-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {st === 'IN_PROGRESS' ? 'Progress' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* New Task Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Create New Operational Task</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Verify Audio Desk Lapel Microphones"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description & Instructions</label>
                <textarea
                  rows="3"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Detailed instructions for the assigned volunteer..."
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Department</label>
                  <select
                    value={newTaskDept}
                    onChange={(e) => setNewTaskDept(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Priority Level</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Assign To Member</label>
                  <select
                    value={newTaskAssigneeId}
                    onChange={(e) => setNewTaskAssigneeId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.roleTitle})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Target Deadline</label>
                  <input
                    type="text"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    placeholder="11:30 AM"
                    className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg"
                >
                  Create & Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
