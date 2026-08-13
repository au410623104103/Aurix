import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Users, 
  Layers, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  QrCode, 
  Plus, 
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamManagement = ({ onSelectMemberForVerify, onSelectMemberForBadge, onOpenRegisterModal }) => {
  const { teams, members } = useDC();

  const [selectedTeamName, setSelectedTeamName] = useState(teams[0]?.name || 'Media Team');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTeam = teams.find(t => t.name === selectedTeamName) || teams[0];
  const teamMembers = members.filter(m => m.team === selectedTeamName && (
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 rounded-3xl p-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-400" />
            <span>Permanent College Teams Management</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Organize members into permanent operational units across college events
          </p>
        </div>

        <button
          onClick={onOpenRegisterModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Member to Team</span>
        </button>
      </div>

      {/* Grid: Team List Left, Members Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Team List Sidebar */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">College Teams ({teams.length})</h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {teams.map(t => {
              const count = members.filter(m => m.team === t.name).length;
              const isSelected = selectedTeamName === t.name;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeamName(t.name)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0A2342] to-[#800020] border-[#800020] text-white shadow-lg'
                      : 'bg-slate-950 border-gray-800 text-gray-300 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold">{t.name}</div>
                    <div className="text-[10px] text-gray-400 line-clamp-1">{t.desc}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-cyan-400 border border-gray-700">
                    {count} Members
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Roster View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-gray-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">PERMANENT UNIT</span>
                <h3 className="text-xl font-black text-white">{selectedTeam?.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{selectedTeam?.desc}</p>
              </div>

              {/* Search */}
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter team members..."
                  className="w-full bg-slate-950 border border-gray-800 text-white text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map(m => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-gray-800 flex items-center justify-between hover:border-cyan-400 transition-all group"
                >
                  <div 
                    onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <img src={m.avatar} alt={m.name} className="w-11 h-11 rounded-xl object-cover border border-cyan-400/40" />
                    <div>
                      <div className="text-xs font-bold text-gray-200 group-hover:text-cyan-300 flex items-center gap-1.5">
                        <span>{m.name}</span>
                        <span className="text-[9px] font-mono text-cyan-400">{m.id}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">{m.roleTitle}</div>
                      <div className="text-[10px] text-gray-500">{m.department}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectMemberForBadge && onSelectMemberForBadge(m)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400"
                      title="View ID Badge"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                      className="p-2 rounded-lg bg-[#800020] hover:bg-rose-700 text-white"
                      title="View Profile Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
