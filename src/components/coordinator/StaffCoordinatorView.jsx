import React, { useState, useRef } from 'react';
import { useDC } from '../../context/DCContext';
import { OFFICIAL_AURIX_TEAMS } from '../../data/dcMockData';
import { 
  Users, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Filter,
  CreditCard,
  ExternalLink,
  Layers,
  Calendar,
  Clock,
  MapPin,
  PlusCircle,
  Briefcase,
  AlertCircle,
  X,
  Check,
  CalendarDays,
  CalendarPlus,
  Trash2,
  Ban,
  RotateCcw,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StaffCoordinatorView = ({ 
  onSwitchToProfile = null, 
  onSwitchToBadge = null, 
  onOpenRegisterModal = null 
}) => {
  const { 
    members, 
    events, 
    getActiveEvent, 
    createNewEvent, 
    assignWorkToTeam, 
    deleteMember,
    denyMemberAccess,
    restoreMemberAccess
  } = useDC();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('ALL');

  // Modal States
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isAssignWorkModalOpen, setIsAssignWorkModalOpen] = useState(false);
  const [isTotalEventsModalOpen, setIsTotalEventsModalOpen] = useState(false);
  const [isUpcomingEventsModalOpen, setIsUpcomingEventsModalOpen] = useState(false);

  // Mouse Drag-to-Scroll State for Team Filter Bar
  const filterScrollRef = useRef(null);
  const [isDraggingFilter, setIsDraggingFilter] = useState(false);
  const [filterStartX, setFilterStartX] = useState(0);
  const [filterScrollLeft, setFilterScrollLeft] = useState(0);

  // New Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '18:00',
    venue: 'Main Auditorium, DCE Chennai Campus',
    description: ''
  });

  // Work Assignment Form State
  const [assignForm, setAssignForm] = useState({
    team: 'Media Team',
    task: ''
  });

  const activeEvt = getActiveEvent();

  // Dynamic Event Analytics Calculations
  const upcomingEvents = events.filter(e => e.id !== activeEvt?.id);
  const totalMembersCount = members.length;
  const activeMembersCount = members.filter(m => m.status !== 'DENIED').length;
  const deniedMembersCount = members.filter(m => m.status === 'DENIED').length;

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (m.roleTitle && m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (m.department && m.department.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedTeam === 'ALL') return matchesSearch;

    const teamKey = selectedTeam.toLowerCase().replace(' team', '');
    const memberRole = (m.roleTitle || '').toLowerCase();
    const memberTeam = (m.team || '').toLowerCase();
    const memberDept = (m.department || '').toLowerCase();

    const matchesTeam = memberRole.includes(teamKey) || 
                        memberTeam.includes(teamKey) || 
                        memberDept.includes(teamKey);

    return matchesSearch && matchesTeam;
  });

  // MOUSE DRAG-TO-SCROLL HANDLERS FOR TEAM FILTERS LIST
  const handleFilterMouseDown = (e) => {
    const container = filterScrollRef.current;
    if (!container) return;
    setIsDraggingFilter(true);
    setFilterStartX(e.pageX - container.offsetLeft);
    setFilterScrollLeft(container.scrollLeft);
  };

  const handleFilterMouseLeave = () => {
    setIsDraggingFilter(false);
  };

  const handleFilterMouseUp = () => {
    setIsDraggingFilter(false);
  };

  const handleFilterMouseMove = (e) => {
    if (!isDraggingFilter) return;
    e.preventDefault();
    const container = filterScrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - filterStartX) * 2;
    container.scrollLeft = filterScrollLeft - walk;
  };

  // Scroll Arrow Buttons
  const scrollFiltersBy = (offset) => {
    if (filterScrollRef.current) {
      filterScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    createNewEvent(eventForm);
    setIsCreateEventModalOpen(false);
    setEventForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '18:00',
      venue: 'Main Auditorium, DCE Chennai Campus',
      description: ''
    });
  };

  const handleAssignWorkSubmit = (e) => {
    e.preventDefault();
    if (!activeEvt || !assignForm.task.trim()) return;

    assignWorkToTeam(activeEvt.id, assignForm.team, assignForm.task);
    setIsAssignWorkModalOpen(false);
    setAssignForm({ team: 'Media Team', task: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#15141B] font-sans antialiased selection:bg-[#2A3BFF] selection:text-white">
      
      {/* EXECUTIVE DESKTOP TOP HEADER BAR */}
      <header className="bg-white border-b border-gray-200/80 px-6 sm:px-14 py-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* LEFT: DC SHIELD LOGO FIRST + AURIX TITLE IN DC NAVY BLUE (#1D2B68) */}
          <div className="flex items-center gap-4">
            <img
              src="/dc_shield_logo.png"
              alt="DC Shield Logo"
              className="h-[52px] sm:h-[60px] w-auto object-contain block"
            />
            <div className="flex flex-col">
              <span className="font-sans font-black text-[28px] sm:text-[36px] tracking-[0.16em] text-[#1D2B68] uppercase leading-none">
                AURIX
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#6B687B] tracking-wider uppercase mt-1">
                Dhaanish Chennai College of Engineering
              </span>
            </div>
          </div>

          {/* RIGHT: "STAFF CO-ORDINATOR" BRANDING TITLE */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#1D2B68]/5 border border-[#1D2B68]/15">
              <ShieldCheck className="w-7 h-7 text-[#1D2B68]" />
              <span className="font-sans font-black text-[18px] sm:text-[22px] tracking-[0.2em] text-[#1D2B68] uppercase">
                STAFF CO-ORDINATOR
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CLEAN DESKTOP WHITE CANVAS AREA */}
      <main className="max-w-7xl mx-auto px-6 sm:px-14 py-10 sm:py-12 space-y-10">
        
        {/* 3 METRIC ANALYTICS CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: TOTAL & ONGOING EVENTS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsTotalEventsModalOpen(true)}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider block">
                Total & Ongoing Events
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#2A3BFF]">
                  {events.length}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {activeEvt ? '1 Active Live' : '0 Active'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold group-hover:text-[#2A3BFF] transition-colors pt-1">
                Tap to view complete list of events ↗
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#2A3BFF]/10 text-[#2A3BFF] flex items-center justify-center font-black group-hover:bg-[#2A3BFF] group-hover:text-white transition-all shrink-0">
              <CalendarDays className="w-7 h-7" />
            </div>
          </motion.div>

          {/* CARD 2: UPCOMING EVENTS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsUpcomingEventsModalOpen(true)}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider block">
                Upcoming Events
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-purple-600">
                  {upcomingEvents.length}
                </span>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Scheduled
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold group-hover:text-purple-600 transition-colors pt-1">
                Tap to view dates & details ↗
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
              <CalendarPlus className="w-7 h-7" />
            </div>
          </motion.div>

          {/* CARD 3: REAL-TIME DYNAMIC TOTAL MEMBERS COUNT */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs flex items-center justify-between group"
          >
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider block">
                Total Volunteers & Members
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {totalMembersCount}
                </span>
                {deniedMembersCount > 0 && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    {deniedMembersCount} Access Denied
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-bold pt-1">
                Active: {activeMembersCount} • Real-time live count
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">
              <Users className="w-7 h-7" />
            </div>
          </motion.div>

        </section>

        {/* EVENT MANAGEMENT HEADER CARD */}
        <section className="bg-white rounded-[36px] p-8 sm:p-12 border border-gray-200/90 shadow-sm relative overflow-hidden space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1D2B68] text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-black text-2xl sm:text-3xl text-[#15141B] uppercase tracking-wide">
                  Event Management
                </h2>
                <p className="text-base sm:text-lg font-bold text-gray-600 mt-1">
                  Configure college symposiums, set active event dates, and assign work tasks to volunteer teams.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {activeEvt && (
                <button
                  onClick={() => setIsAssignWorkModalOpen(true)}
                  className="px-7 py-4 rounded-2xl bg-[#2A3BFF] hover:bg-blue-700 text-white font-black text-sm sm:text-base flex items-center gap-3 shadow-sm hover:scale-102 transition-all cursor-pointer"
                >
                  <Briefcase className="w-5 h-5 text-emerald-300" />
                  <span>Assign Work to Team</span>
                </button>
              )}

              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="px-7 py-4 rounded-2xl bg-[#15141B] hover:bg-black text-white font-black text-sm sm:text-base flex items-center gap-3 shadow-sm hover:scale-102 transition-all cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <span>Create Event</span>
              </button>
            </div>
          </div>

          {/* ACTIVE EVENT STATUS DISPLAY */}
          {activeEvt ? (
            <div className="bg-[#F5F2FB] rounded-3xl p-8 sm:p-10 border border-[#2A3BFF]/25 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm sm:text-base font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                    LIVE EVENT ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-6 text-base sm:text-lg font-black text-gray-800 font-mono">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#2A3BFF]" />
                    {activeEvt.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#2A3BFF]" />
                    {activeEvt.startTime} - {activeEvt.endTime}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-black text-3xl sm:text-4xl text-[#1D2B68] uppercase tracking-wide leading-tight">
                  {activeEvt.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-800 mt-2 font-extrabold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2A3BFF] shrink-0" />
                  <span>{activeEvt.venue}</span>
                </p>
                {activeEvt.description && (
                  <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed font-bold bg-white/80 p-5 rounded-2xl border border-gray-200/70">
                    {activeEvt.description}
                  </p>
                )}
              </div>

              {/* CURRENT TEAM WORK ASSIGNMENTS SUMMARY */}
              {Object.keys(activeEvt.workAssignments || {}).length > 0 && (
                <div className="pt-5 border-t border-gray-200/90 space-y-4">
                  <h4 className="text-base sm:text-lg font-black text-[#15141B] uppercase tracking-wider flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-[#2A3BFF]" />
                    Assigned Team Work Tasks ({Object.keys(activeEvt.workAssignments).length}):
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.entries(activeEvt.workAssignments).map(([teamName, taskText]) => (
                      <div key={teamName} className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/90 space-y-2 shadow-xs">
                        <span className="font-black text-[#2A3BFF] uppercase tracking-wider text-base sm:text-lg block">
                          {teamName}
                        </span>
                        <p className="text-[#15141B] font-extrabold leading-relaxed text-sm sm:text-base">
                          "{taskText}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-8 sm:p-10 text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="font-black text-xl sm:text-2xl text-amber-900 uppercase">No Event Active Currently</h3>
              <p className="text-sm sm:text-base text-amber-800 max-w-lg mx-auto font-bold">
                No active event is running at this time. Click <strong>"Create Event"</strong> to launch a new college fest or event and assign work to volunteer teams.
              </p>
            </div>
          )}

        </section>

        {/* SEARCH & MOUSE DRAG-TO-SCROLL TEAM FILTERS BAR */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="relative w-full sm:w-[440px]">
              <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coordinator by name, ID, or team..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-sm sm:text-base font-bold text-[#15141B] focus:outline-none focus:border-[#2A3BFF] shadow-xs"
              />
            </div>

            <div className="flex items-center gap-3 text-base sm:text-lg font-black text-gray-700">
              <Layers className="w-6 h-6 text-[#2A3BFF]" />
              <span>Filtering by: <strong className="text-[#1D2B68] uppercase text-base sm:text-xl font-black">{selectedTeam}</strong></span>
            </div>
          </div>

          {/* TEAM FILTER CHIPS */}
          <div className="relative flex items-center group/filter">
            
            {/* Left Scroll Arrow Button */}
            <button
              onClick={() => scrollFiltersBy(-250)}
              className="absolute -left-4 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md text-[#15141B] hover:bg-[#1D2B68] hover:text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
              title="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* CLICK & DRAG HORIZONTAL SCROLL CONTAINER */}
            <div
              ref={filterScrollRef}
              onMouseDown={handleFilterMouseDown}
              onMouseLeave={handleFilterMouseLeave}
              onMouseUp={handleFilterMouseUp}
              onMouseMove={handleFilterMouseMove}
              className={`flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-2 no-scrollbar select-none cursor-grab ${
                isDraggingFilter ? 'cursor-grabbing scroll-auto' : 'scroll-smooth'
              }`}
            >
              <Filter className="w-6 h-6 text-gray-400 shrink-0 mr-1" />
              {OFFICIAL_AURIX_TEAMS.map((teamName) => (
                <button
                  key={teamName}
                  onClick={() => {
                    if (!isDraggingFilter) setSelectedTeam(teamName);
                  }}
                  className={`px-6 py-3.5 rounded-2xl text-sm sm:text-base font-black transition-all cursor-pointer shrink-0 border ${
                    selectedTeam === teamName
                      ? 'bg-[#1D2B68] text-white border-[#1D2B68] shadow-md scale-105'
                      : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-200/90 hover:border-gray-300'
                  }`}
                >
                  {teamName}
                </button>
              ))}
            </div>

            {/* Right Scroll Arrow Button */}
            <button
              onClick={() => scrollFiltersBy(250)}
              className="absolute -right-4 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md text-[#15141B] hover:bg-[#1D2B68] hover:text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
              title="Scroll Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        </section>

        {/* COORDINATOR MEMBERS DIRECTORY GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-2xl sm:text-3xl text-[#15141B] uppercase tracking-wider flex items-center gap-3">
              <Users className="w-7 h-7 text-[#2A3BFF]" />
              Coordinators Directory — {selectedTeam} ({filteredMembers.length})
            </h3>

            {onOpenRegisterModal && (
              <button
                onClick={onOpenRegisterModal}
                className="px-6 py-3 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-black text-sm sm:text-base flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm"
              >
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <span>Add Member (+1 Count)</span>
              </button>
            )}
          </div>

          {filteredMembers.length === 0 ? (
            <div className="bg-white rounded-3xl p-14 text-center border border-gray-200/80 space-y-5 shadow-xs flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2A3BFF] flex items-center justify-center font-black">
                <Users className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xl text-gray-800 uppercase">Directory Ready — 0 Volunteers</h4>
                <p className="text-sm text-gray-500 max-w-md mx-auto font-medium">
                  Click below to add a new volunteer student. The system will automatically generate their <strong>unique Volunteer ID (DC0001)</strong>, permanent QR code, and profile record.
                </p>
              </div>
              {onOpenRegisterModal && (
                <button
                  onClick={onOpenRegisterModal}
                  className="px-8 py-4 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-black text-sm flex items-center gap-3 transition-all cursor-pointer shadow-md hover:scale-105 mt-2"
                >
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <span>REGISTER NEW VOLUNTEER (+1)</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((m) => {
                const isDenied = m.status === 'DENIED';
                const hasPhoto = m.heroCutout || m.avatar;

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-[32px] p-7 sm:p-8 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative group ${
                      isDenied ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200/90'
                    }`}
                  >
                    {/* Delete Member Button */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${m.name} (${m.id}) from directory?`)) {
                          deleteMember(m.id);
                        }
                      }}
                      className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-4 pr-8">
                      {/* SILHOUETTE PLACEHOLDER FORMAT IF NO PHOTO ADDED YET BY MAM */}
                      {hasPhoto ? (
                        <img
                          src={m.heroCutout || m.avatar}
                          alt={m.name}
                          className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border shadow-xs shrink-0 ${
                            isDenied ? 'filter grayscale border-rose-300' : 'border-gray-100'
                          }`}
                        />
                      ) : (
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#ECE7F9] border border-purple-200/80 flex items-center justify-center shrink-0 shadow-xs">
                          <User className="w-10 h-10 text-[#C9C1EA]" />
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xl sm:text-2xl text-[#15141B]">{m.name}</span>
                          {!isDenied ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>

                        {/* STATUS BADGE */}
                        <div className="pt-0.5">
                          {isDenied ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black text-xs uppercase tracking-wider border border-rose-300">
                              🛑 ACCESS DENIED / QR DISABLED
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black text-xs uppercase tracking-wider border border-emerald-200">
                              ACTIVE VOLUNTEER
                            </span>
                          )}
                        </div>

                        <p className="text-sm sm:text-base font-black text-[#2A3BFF] uppercase tracking-wider pt-1">{m.roleTitle || m.team || 'Coordinator'}</p>
                        <p className="text-xs sm:text-sm font-extrabold text-gray-500 uppercase tracking-widest">{m.department}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm sm:text-base font-black">
                      <span className="text-gray-500">ID: {m.id}</span>
                      <span className="text-gray-800 font-mono tracking-wider">{m.batch || '2 0 2 4 - 2 0 2 8'}</span>
                    </div>

                    {/* STAFF ACCESS DENIAL & PROFILE BUTTONS */}
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-3">
                        {onSwitchToProfile && (
                          <button
                            onClick={() => onSwitchToProfile(m)}
                            className="py-3.5 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#15141B] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4 text-[#2A3BFF]" />
                            <span>View Profile</span>
                          </button>
                        )}

                        {onSwitchToBadge && (
                          <button
                            onClick={() => onSwitchToBadge(m)}
                            className="py-3.5 px-4 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                          >
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                            <span>View Badge</span>
                          </button>
                        )}
                      </div>

                      {/* SLEEK PROFESSIONAL DENY / RESTORE ACCESS ACTION BUTTON */}
                      {!isDenied ? (
                        <button
                          onClick={() => {
                            if (window.confirm(`Deny QR access for ${m.name}? Their QR code will immediately stop scanning until restored by Mam.`)) {
                              denyMemberAccess(m.id);
                            }
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-rose-50/90 hover:bg-rose-100 text-rose-700 font-extrabold text-xs sm:text-sm border border-rose-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Ban className="w-4 h-4 text-rose-600" />
                          <span>Deny Access</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (window.confirm(`Restore active status and QR code for ${m.name}?`)) {
                              restoreMemberAccess(m.id);
                            }
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs sm:text-sm border border-emerald-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4 text-emerald-600" />
                          <span>Restore Active Status</span>
                        </button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* MODALS */}
      <AnimatePresence>
        {isTotalEventsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-2xl shadow-2xl space-y-6 font-sans max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2A3BFF] text-white flex items-center justify-center font-black">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#15141B]">Total College Events Directory ({events.length})</h3>
                    <p className="text-xs text-gray-500 font-bold">Complete list of ongoing and scheduled events</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTotalEventsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-6 rounded-2xl bg-[#F8FAFD] border border-gray-200/90 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-black text-lg text-[#1D2B68] uppercase">{evt.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        evt.id === activeEvt?.id ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-purple-100 text-purple-700 border border-purple-300'
                      }`}>
                        {evt.id === activeEvt?.id ? 'LIVE ACTIVE' : 'SCHEDULED'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-gray-600 font-mono">
                      <span>🗓 {evt.date}</span>
                      <span>⏰ {evt.startTime} - {evt.endTime}</span>
                      <span>📍 {evt.venue}</span>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-gray-700 font-medium">{evt.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPCOMING EVENTS MODAL */}
      <AnimatePresence>
        {isUpcomingEventsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-2xl shadow-2xl space-y-6 font-sans max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black">
                    <CalendarPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#15141B]">Upcoming Scheduled Events ({upcomingEvents.length})</h3>
                    <p className="text-xs text-gray-500 font-bold">Future college symposiums and dates</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUpcomingEventsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evt) => (
                  <div key={evt.id} className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-black text-lg text-purple-900 uppercase">{evt.title}</h4>
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-purple-200 text-purple-900">
                        UPCOMING
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-purple-800 font-mono">
                      <span>🗓 {evt.date}</span>
                      <span>⏰ {evt.startTime} - {evt.endTime}</span>
                      <span>📍 {evt.venue}</span>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-purple-900 font-medium">{evt.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE NEW EVENT MODAL */}
      <AnimatePresence>
        {isCreateEventModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-xl shadow-2xl space-y-6 font-sans"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1D2B68] text-white flex items-center justify-center font-black">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-xl text-[#15141B]">Create New College Event</h3>
                </div>
                <button
                  onClick={() => setIsCreateEventModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateEventSubmit} className="space-y-5 text-sm sm:text-base font-sans">
                <div>
                  <label className="block text-gray-900 font-black mb-1.5">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. AURIX 2026 ANNUAL FEST"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-base focus:outline-none focus:border-[#2A3BFF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-gray-900 font-black mb-1.5">Event Date *</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-3.5 py-3 text-gray-900 font-bold focus:outline-none focus:border-[#2A3BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-black mb-1.5">Start Time *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.startTime}
                      onChange={(e) => setEventForm(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-3.5 py-3 text-gray-900 font-bold focus:outline-none focus:border-[#2A3BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-black mb-1.5">End Time *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-3.5 py-3 text-gray-900 font-bold focus:outline-none focus:border-[#2A3BFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-black mb-1.5">Venue Location *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.venue}
                    onChange={(e) => setEventForm(prev => ({ ...prev, venue: e.target.value }))}
                    placeholder="e.g. Main Auditorium, DCE Chennai Campus"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-bold focus:outline-none focus:border-[#2A3BFF]"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-black mb-1.5">Description & Instructions</label>
                  <textarea
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter event overview, instructions, and objectives..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-4 text-gray-900 font-medium focus:outline-none focus:border-[#2A3BFF]"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateEventModalOpen(false)}
                    className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-extrabold transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Publish & Activate Event</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ASSIGN WORK TO TEAM MODAL */}
      <AnimatePresence>
        {isAssignWorkModalOpen && activeEvt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-xl shadow-2xl space-y-6 font-sans"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2A3BFF] text-white flex items-center justify-center font-black">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#15141B]">Assign Work Task to Team</h3>
                    <p className="text-sm text-[#2A3BFF] font-black uppercase tracking-wider">{activeEvt.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAssignWorkModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAssignWorkSubmit} className="space-y-5 text-sm sm:text-base font-sans">
                <div>
                  <label className="block text-gray-900 font-black mb-1.5">Select Target Team *</label>
                  <select
                    value={assignForm.team}
                    onChange={(e) => setAssignForm(prev => ({ ...prev, team: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black focus:outline-none focus:border-[#2A3BFF]"
                  >
                    {OFFICIAL_AURIX_TEAMS.filter(t => t !== 'ALL').map(tName => (
                      <option key={tName} value={tName}>{tName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-black mb-1.5">Assigned Task & Work Instructions *</label>
                  <textarea
                    rows={4}
                    required
                    value={assignForm.task}
                    onChange={(e) => setAssignForm(prev => ({ ...prev, task: e.target.value }))}
                    placeholder="e.g. For Media Team: Capture high-resolution inaugural ceremony photos, film video highlights, and edit reels for social media."
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-4 text-gray-900 font-medium focus:outline-none focus:border-[#2A3BFF]"
                  />
                </div>

                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-900 font-semibold leading-relaxed">
                  ✦ <strong>Automatic Volunteer Notification:</strong> Every volunteer member assigned to <strong>"{assignForm.team}"</strong> will immediately see this task on their profile card for the duration of <strong>{activeEvt.title}</strong>!
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAssignWorkModalOpen(false)}
                    className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-2xl bg-[#2A3BFF] hover:bg-blue-700 text-white font-extrabold transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>Broadcast Task to {assignForm.team}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-20 py-10 border-t border-gray-200/80 bg-white text-center font-sans">
        <p className="text-base font-black text-[#15141B] tracking-[0.14em] uppercase">
          © 2026 AURIX • Staff Co-Ordinator Web Portal
        </p>
        <p className="text-sm font-bold text-[#6B687B] mt-1.5 tracking-wider">
          Dhaanish Chennai College of Engineering — Built by KM Labs
        </p>
      </footer>

    </div>
  );
};
