import React from 'react';
import { useDC } from '../../context/DCContext';
import { Radio, Users, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

export const LiveBanner = () => {
  const { events, members, currentUser, toggleMemberCheckIn } = useDC();

  const activeEvent = events[0] || { name: 'DHAANISH EVENTS ECOSYSTEM', location: 'DC Campus Auditorium' };

  const totalMembers = members.length;
  const checkedInCount = members.filter(m => m.isCheckedIn).length;
  const percentCheckedIn = Math.round((checkedInCount / (totalMembers || 1)) * 100);

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A2342]/90 border-b border-gray-800 px-4 lg:px-8 py-3 relative overflow-hidden shadow-inner">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Status & Event Info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full md:w-auto">
          
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>🟢 EVENT ACTIVE</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Active Event</span>
              <span className="font-extrabold text-white text-sm">{activeEvent.name}</span>
            </div>

            <div className="hidden sm:block border-l border-gray-800 h-7" />

            <div className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#800020]" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Venue</span>
                <span className="line-clamp-1">{activeEvent.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Team Attendance Gauge */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-2 md:pt-0 border-t border-gray-800/80 md:border-none">
          
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="flex items-center justify-between gap-4 text-xs font-mono mb-1">
                <span className="text-gray-400">Checked In:</span>
                <span className="font-bold text-emerald-400">{checkedInCount} / {totalMembers} ({percentCheckedIn}%)</span>
              </div>
              <div className="w-44 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${percentCheckedIn}%` }}
                />
              </div>
            </div>
          </div>

          {currentUser && (
            <button
              onClick={() => toggleMemberCheckIn(currentUser.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                currentUser.isCheckedIn
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-red-500/20 hover:text-red-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-emerald-500/20 hover:text-emerald-400'
              }`}
            >
              {currentUser.isCheckedIn ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>CHECKED IN</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>MARK IN</span>
                </>
              )}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
