import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Plus, 
  Award, 
  Sparkles, 
  ExternalLink, 
  Layers,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EventsModule = ({ onSelectMemberForVerify }) => {
  const { events, createEvent, members, teams } = useDC();

  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Event State
  const [evtName, setEvtName] = useState('');
  const [evtCategory, setEvtCategory] = useState('Technical Fest');
  const [evtLocation, setEvtLocation] = useState('DC Main Auditorium & Campus Lawn');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtAssignedTeams, setEvtAssignedTeams] = useState(['Media Team', 'Security Team']);

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!evtName.trim()) return;

    const now = new Date();
    const created = createEvent({
      name: evtName,
      category: evtCategory,
      startDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 8).toISOString(),
      location: evtLocation,
      status: 'UPCOMING',
      description: evtDesc || 'Official Dhaanish College of Engineering Event.',
      assignedTeams: evtAssignedTeams
    });

    setSelectedEventId(created.id);
    setEvtName('');
    setEvtDesc('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0A2342] via-slate-950 to-[#800020] border border-gray-800 rounded-3xl p-6 text-white shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              UNIVERSAL COLLEGE EVENT OPERATIONS
            </span>
            <span className="text-xs text-gray-300">• Common Identity for All Events</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            DC Events & Team Assignments
          </h1>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Alumni Meets, Technical Fests, Symposiums, Workshops, Placement Activities & Cultural Fests.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {events.map(evt => {
          const isSelected = selectedEvent?.id === evt.id;
          return (
            <button
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-[#0A2342] to-[#800020] text-white border border-[#800020] shadow-lg'
                  : 'bg-slate-900 text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{evt.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Event Detail & Team Roster */}
      {selectedEvent && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Selected Event Specs Card */}
          <div className="glass-panel rounded-3xl p-6 border border-gray-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold bg-[#800020] text-white px-2.5 py-0.5 rounded uppercase">
                  {selectedEvent.category}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{selectedEvent.name}</h2>
                <p className="text-xs text-gray-300 mt-0.5">{selectedEvent.description}</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-gray-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between">
                <span className="text-gray-400">Start Date:</span>
                <span className="font-bold text-white">{new Date(selectedEvent.startDate).toLocaleDateString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between">
                <span className="text-gray-400">End Date:</span>
                <span className="font-bold text-white">{new Date(selectedEvent.endDate).toLocaleDateString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-bold text-emerald-400">🟢 {selectedEvent.status}</span>
              </div>
            </div>
          </div>

          {/* Assigned Teams Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Assigned Operational Teams for {selectedEvent.name}</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {selectedEvent.assignedTeams?.map((teamName, idx) => {
                const teamMembers = members.filter(m => m.team === teamName);
                return (
                  <div key={idx} className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                      <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{teamName}</span>
                      </span>
                      <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                        {teamMembers.length} Members
                      </span>
                    </div>

                    <div className="space-y-2">
                      {teamMembers.map(m => (
                        <div
                          key={m.id}
                          onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                          className="p-2.5 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between hover:border-cyan-400 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-xl object-cover border border-cyan-400/40" />
                            <div>
                              <div className="text-xs font-bold text-gray-200 group-hover:text-cyan-300">{m.name} ({m.id})</div>
                              <div className="text-[10px] text-gray-400">{m.roleTitle} • {m.department}</div>
                            </div>
                          </div>

                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Create New Dhaanish College Event</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Event Name *</label>
                <input
                  type="text"
                  required
                  value={evtName}
                  onChange={(e) => setEvtName(e.target.value)}
                  placeholder="e.g. Alumni Meet 2026 / Inspironz Tech Fest"
                  className="w-full bg-slate-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Category</label>
                  <select
                    value={evtCategory}
                    onChange={(e) => setEvtCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Alumni Meet">Alumni Meet</option>
                    <option value="Technical Fest">Technical Fest (Inspironz)</option>
                    <option value="Symposium">Symposium</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Placement Activity">Placement Activity</option>
                    <option value="Cultural Event">Cultural Event</option>
                    <option value="Club Activity">Club Activity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Venue / Location</label>
                  <input
                    type="text"
                    value={evtLocation}
                    onChange={(e) => setEvtLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                  placeholder="Event purpose and schedule details..."
                  className="w-full bg-slate-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg"
                >
                  Create Event & Assign Teams
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
