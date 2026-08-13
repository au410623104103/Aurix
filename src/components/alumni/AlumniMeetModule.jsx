import React from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Award, 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink, 
  Sparkles, 
  Phone, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AlumniMeetModule = ({ onSelectMemberForVerify }) => {
  const { events, members } = useDC();

  // Find Grand Alumni Meet event
  const alumniEvent = events.find(e => e.id.includes('alumni')) || events[0];

  const assignedTeams = alumniEvent?.assignedTeams || [
    'Media Team', 'Photography Team', 'Bouncers Team', 'Registration Team', 'Hospitality Team'
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0A2342] via-slate-950 to-[#800020] p-6 sm:p-8 border border-gray-800 text-white overflow-hidden shadow-2xl">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              FEATURED DC EVENT
            </span>
            <span className="text-xs text-gray-300 font-mono">Real-Time Event Status: 🟢 ACTIVE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {alumniEvent?.name}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {alumniEvent?.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{new Date(alumniEvent?.startDate).toLocaleDateString([], { dateStyle: 'full' })}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{alumniEvent?.location}</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Users className="w-4 h-4" />
              <span>{alumniEvent?.registeredAlumniCount || 240} Registered Alumni</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Chief Guests & Assigned Operations Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Chief Guests */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Honored Chief Guests</span>
          </h2>

          <div className="space-y-3">
            {alumniEvent?.chiefGuests?.map((guest, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-gray-800 space-y-1 hover:border-amber-500/40 transition-colors">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">Distinguished Keynote</div>
                <div className="text-sm font-extrabold text-white">{guest.name}</div>
                <div className="text-xs text-gray-400">{guest.title}</div>
              </div>
            ))}
          </div>

          {/* Quick Alumni Registration Stat Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0A2342] to-slate-950 border border-gray-800 text-white space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Alumni Registration Desk</div>
            <div className="text-3xl font-black text-white">{alumniEvent?.registeredAlumniCount || 240}</div>
            <p className="text-xs text-gray-300">Alumni verified and badges generated for physical entrance check-in.</p>
          </div>
        </div>

        {/* Right 2 Cols: Assigned Operations Teams */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Assigned Operations Teams & Member Profiles</span>
          </h2>

          <div className="space-y-4">
            {assignedTeams.map((teamName, idx) => {
              const teamMembers = members.filter(m => m.team === teamName);
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{teamName}</span>
                    </span>
                    <span className="text-[10px] font-mono bg-[#800020] text-white px-2 py-0.5 rounded font-bold">
                      {teamMembers.length} Members Assigned
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teamMembers.map(m => (
                      <div
                        key={m.id}
                        onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                        className="p-3 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between hover:border-cyan-400 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40" />
                          <div>
                            <div className="text-xs font-bold text-gray-200 group-hover:text-cyan-300">{m.name}</div>
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

    </div>
  );
};
