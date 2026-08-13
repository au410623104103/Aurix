import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Users, 
  Search, 
  QrCode, 
  Printer, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  ShieldCheck, 
  UserCheck,
  ExternalLink
} from 'lucide-react';

export const TeamDirectory = ({ onSelectMemberForBadge, onSelectMemberForVerify }) => {
  const { members, toggleMemberCheckIn, currentUser } = useDC();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="clean-card p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Member Roster & Digital Identities</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">View digital ID badges, check-in status, and open exact profile pages</p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-900 text-white text-xs font-bold shadow-md hover:bg-black transition-colors"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Batch Print Badges</span>
        </button>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredMembers.map(member => (
          <div key={member.id} className="clean-card p-4 border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-all group">
            
            <div 
              onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(member)}
              className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden"
            >
              <img src={member.heroCutout || member.avatar} alt={member.name} className="w-12 h-14 rounded-xl object-cover border border-gray-200 shrink-0 bg-white" />
              <div className="overflow-hidden">
                <div className="text-xs font-black text-gray-900 group-hover:text-indigo-600 flex items-center gap-1">
                  <span className="truncate">{member.name}</span>
                  <span className="text-[9px] font-mono text-gray-400">{member.id}</span>
                </div>
                <div className="text-[10px] font-bold text-[#1E40AF] truncate">{member.roleTitle}</div>
                <div className="text-[10px] text-gray-500 truncate">{member.department}</div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => onSelectMemberForBadge && onSelectMemberForBadge(member)}
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                title="View ID Badge"
              >
                <QrCode className="w-4 h-4 text-indigo-600" />
              </button>
              <button
                onClick={() => onSelectMemberForVerify && onSelectMemberForVerify(member)}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                title="View Profile Page"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
