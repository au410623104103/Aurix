import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Scan as ScanIcon, 
  Plus, 
  Bell, 
  ShieldAlert, 
  Sparkles, 
  Radio, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

export const CommandDashboard = ({ setActiveTab, onScanClick, onOpenQuickTaskModal, onOpenIssueModal }) => {
  const { currentUser, currentEvent, users, tasks, issues, announcements, ROLE_DEFINITIONS } = useAuth();

  const userRoleObj = ROLE_DEFINITIONS[currentUser?.role] || ROLE_DEFINITIONS.VOLUNTEER;

  // Calculate Metrics
  const totalMembers = currentEvent.totalMembers || users.length;
  const checkedInMembers = users.filter(u => u.isCheckedIn).length;
  const activeVolunteers = users.filter(u => u.role === 'VOLUNTEER' && u.isCheckedIn).length;
  
  const tasksCompleted = tasks.filter(t => t.status === 'COMPLETED').length;
  const tasksPending = tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length;
  const issuesReported = issues.length;
  const openIssues = issues.filter(i => i.status === 'OPEN' || i.status === 'IN_PROGRESS').length;

  const attendancePercent = Math.round((checkedInMembers / totalMembers) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Banner Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-950 border border-gray-800 p-6 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${userRoleObj.badgeColor}`}>
                {userRoleObj.name}
              </span>
              <span className="text-xs text-gray-400">• {currentUser?.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-white via-gray-200 to-cyan-400 bg-clip-text text-transparent">{currentUser?.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              {currentEvent.name} Command Desk • {currentUser?.team} • Identity Token: <code className="text-cyan-400 font-mono">{currentUser?.token}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onScanClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <ScanIcon className="w-4 h-4" />
              <span>Scan QR ID</span>
            </button>

            <button
              onClick={() => setActiveTab('my-badge')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold text-xs transition-colors"
            >
              <span>My Badge</span>
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD CARDS (Matching Requirement #4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* TOTAL TEAM MEMBERS */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Team</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{totalMembers}</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Assigned to Event</p>
          </div>
        </div>

        {/* ACTIVE VOLUNTEERS */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Volunteers</span>
            <UserCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-cyan-400">{activeVolunteers}</div>
            <p className="text-[10px] text-gray-400 mt-0.5">On Ground & Active</p>
          </div>
        </div>

        {/* TASKS COMPLETED */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tasks Done</span>
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-400">{tasksCompleted}</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Verified Finished</p>
          </div>
        </div>

        {/* TASKS PENDING */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tasks Pending</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-400">{tasksPending}</div>
            <p className="text-[10px] text-gray-400 mt-0.5">In Progress / Todo</p>
          </div>
        </div>

        {/* ISSUES REPORTED */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Issues</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-400">{openIssues}</div>
            <p className="text-[10px] text-gray-400 mt-0.5">{issuesReported} Total Reported</p>
          </div>
        </div>

        {/* TEAM ATTENDANCE */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attendance</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-400">{attendancePercent}%</div>
            <p className="text-[10px] text-gray-400 mt-0.5">{checkedInMembers} Checked In</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Operational Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Tasks & Live Activity Stream */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Priority Tasks Command Card */}
          <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Priority Task Board</h3>
              </div>

              {(currentUser?.role === 'ADMIN' || currentUser?.role === 'EVENT_COORDINATOR' || currentUser?.role === 'EVENT_HEAD') && (
                <button
                  onClick={onOpenQuickTaskModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Task</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="p-3.5 rounded-xl bg-gray-900/90 border border-gray-800 flex items-center justify-between gap-3 hover:border-gray-700 transition-colors">
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        task.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                        task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs font-bold text-gray-200 line-clamp-1">{task.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                      <span>Dept: {task.department}</span>
                      <span>Assignee: {task.assignedTo}</span>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${
                    task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                    task.status === 'IN_PROGRESS' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' :
                    'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('tasks')}
              className="w-full text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 py-2 border-t border-gray-800/80 flex items-center justify-center gap-1"
            >
              <span>View All Tasks Board</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Department Breakdown Bar */}
          <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Department Readiness Overview</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Technical Operations', lead: 'Syed Muaz', active: '18 / 20', ready: '90%' },
                { name: 'Media & Marketing', lead: 'Anshif', active: '12 / 14', ready: '85%' },
                { name: 'Stage & Sound', lead: 'Kevin Patel', active: '15 / 16', ready: '94%' },
                { name: 'Guest Relations', lead: 'Priyesha Das', active: '10 / 12', ready: '83%' },
              ].map((dept, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-200">{dept.name}</span>
                    <span className="text-emerald-400 font-mono">{dept.ready}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Lead: {dept.lead}</span>
                    <span>{dept.active} Checked In</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: dept.ready }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Broadcasts & Quick Emergency Report */}
        <div className="space-y-6">
          
          {/* Pinned Broadcasts */}
          <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Official Broadcasts</span>
              </h3>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-[11px] text-cyan-400 font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="p-3 rounded-xl bg-gray-900/90 border border-amber-500/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>{ann.title}</span>
                    <span className="text-[9px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-mono">PINNED</span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{ann.content}</p>
                  <div className="text-[10px] text-gray-500 flex justify-between pt-1 border-t border-gray-800">
                    <span>{ann.author} ({ann.authorRole})</span>
                    <span>{new Date(ann.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident / Emergency Report Box */}
          <div className="glass-panel rounded-2xl p-5 border border-red-900/40 bg-gradient-to-b from-red-950/20 to-transparent space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Report Ground Issue</h3>
            </div>
            <p className="text-xs text-gray-400">
              Technical failure, VVIP delay, or security issue? Dispatch immediate help to your location.
            </p>
            <button
              onClick={onOpenIssueModal}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Emergency Issue</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
