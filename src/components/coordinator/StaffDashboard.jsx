import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Users, 
  Building, 
  Layers, 
  Calendar, 
  Plus, 
  UserPlus, 
  QrCode, 
  Printer, 
  Search,
  ExternalLink,
  CheckCircle2,
  Scan as ScanIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StaffDashboard = ({ onOpenRegisterModal, onSelectMemberForVerify, onSelectMemberForBadge, setActiveTab, onScanClick }) => {
  const { members, departments, teams, events } = useDC();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans max-w-5xl mx-auto">
      
      {/* Clean Staff Coordinator Header */}
      <div className="clean-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono">
              STAFF COORDINATOR PORTAL
            </span>
            <span className="text-xs text-gray-400">• Dhaanish College</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Digital Identity & Event Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Register members, auto-generate transparent PNG cutout profiles, scan QR codes, and assign event teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>

          <button
            onClick={onScanClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-colors"
          >
            <ScanIcon className="w-4 h-4" />
            <span>Scan QR</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Print Cards</span>
          </button>
        </div>
      </div>

      {/* Member Directory Grid - Clean & Minimalist */}
      <div className="clean-card p-6 border border-gray-100 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>College Member Roster ({filteredMembers.length})</span>
            </h2>
            <p className="text-xs text-gray-400">Click any member to open their exact profile page as shown in the video</p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member name, department, team..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMembers.map(m => (
            <div 
              key={m.id}
              className="p-3.5 rounded-2xl bg-gray-50 hover:bg-blue-50/50 border border-gray-200/80 flex items-center justify-between transition-all group"
            >
              <div 
                onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden"
              >
                <img src={m.heroCutout || m.avatar} alt={m.name} className="w-11 h-13 rounded-xl object-cover border border-gray-200 shrink-0 bg-white" />
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-gray-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <span className="truncate">{m.name}</span>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">{m.id}</span>
                  </div>
                  <div className="text-[10px] font-bold text-[#1E40AF] truncate">{m.roleTitle}</div>
                  <div className="text-[10px] text-gray-500 truncate">{m.department} • {m.team}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={() => onSelectMemberForBadge && onSelectMemberForBadge(m)}
                  className="p-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-xs"
                  title="View ID Badge Card"
                >
                  <QrCode className="w-4 h-4 text-indigo-600" />
                </button>
                <button
                  onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(m)}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  title="View Profile Screen"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
