import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  Phone, 
  Mail, 
  Globe as Linkedin, 
  Share2 as Instagram, 
  Bot, 
  ShieldCheck, 
  Check, 
  X,
  AlertCircle,
  Plus,
  Radio,
  UserCheck
} from 'lucide-react';

export const VerifiedProfile = ({ verifiedUser, onClose, onQuickTaskAssign }) => {
  const { toggleCheckIn, currentUser, ROLE_DEFINITIONS } = useAuth();
  const [showBotModal, setShowBotModal] = useState(false);
  const [botQuery, setBotQuery] = useState('');
  const [botReply, setBotReply] = useState(null);

  if (!verifiedUser) return null;

  const roleDef = ROLE_DEFINITIONS[verifiedUser.role] || ROLE_DEFINITIONS.VOLUNTEER;

  const handleBotAsk = (e) => {
    e.preventDefault();
    if (!botQuery.trim()) return;
    
    // Simulate AI Event Assistant response
    const q = botQuery.toLowerCase();
    let reply = `Member ${verifiedUser.name} is verified for ${verifiedUser.team} (${verifiedUser.department}).`;
    if (q.includes('task') || q.includes('work')) {
      reply = `${verifiedUser.name} has ${verifiedUser.assignedTasksCount || 4} assigned tasks (${verifiedUser.completedTasksCount || 3} completed).`;
    } else if (q.includes('contact') || q.includes('phone')) {
      reply = `Direct mobile number: ${verifiedUser.phone}. Email: ${verifiedUser.email}.`;
    } else if (q.includes('status') || q.includes('check')) {
      reply = `Check-in status: ${verifiedUser.isCheckedIn ? 'Checked In at ' + new Date(verifiedUser.checkInTime).toLocaleTimeString() : 'Not Checked In yet'}.`;
    }
    setBotReply(reply);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Mobile Phone Mockup Frame - Matching Screenshot 4 & 5 Exact Layout */}
      <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800 relative flex flex-col min-h-[640px] max-h-[90vh]">
        
        {/* Top Phone Status & Header Bar */}
        <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 font-black tracking-widest text-lg text-slate-900">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>IEDC</span>
          </div>
        </div>

        {/* Verification Success Toast Bar */}
        <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-between text-xs font-bold shadow-inner">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>IDENTITY VERIFIED • EVENTOPS SECURE</span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-700 px-2 py-0.5 rounded">{verifiedUser.token}</span>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Hero Photo Cutout (Matching screenshot 5) */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="w-48 h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-slate-900 bg-slate-100 relative group">
              <img
                src={verifiedUser.heroAvatar || verifiedUser.avatar}
                alt={verifiedUser.name}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Checked In Tag */}
              <div className="absolute top-2 right-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-md border ${
                  verifiedUser.isCheckedIn
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-amber-500 text-white border-amber-400'
                }`}>
                  {verifiedUser.isCheckedIn ? '✓ CHECKED IN' : 'OUT'}
                </span>
              </div>
            </div>
          </div>

          {/* Bold Header Text Section (Matching Screenshot 5 Typography) */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight uppercase leading-none">
              {verifiedUser.roleTitle || verifiedUser.name}
            </h1>
            <h2 className="text-sm font-black text-gray-600 tracking-widest uppercase">
              {verifiedUser.department}
            </h2>
            <p className="text-xs font-mono font-bold text-gray-400">
              {verifiedUser.batch}
            </p>
          </div>

          {/* Quick Action Contact Links (Matching Screenshot 4 & 5 Layout) */}
          <div className="space-y-3 pt-2">
            
            <a
              href={verifiedUser.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200/80 text-gray-900 font-extrabold text-sm tracking-wider uppercase transition-all group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-indigo-600" />
                <span>LINKEDIN</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={verifiedUser.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-pink-50 border border-gray-200/80 text-gray-900 font-extrabold text-sm tracking-wider uppercase transition-all group"
            >
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>INSTAGRAM</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${verifiedUser.email}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200/80 text-gray-900 font-extrabold text-sm tracking-wider uppercase transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>EMAIL</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={`tel:${verifiedUser.phone}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200/80 text-gray-900 font-extrabold text-sm tracking-wider uppercase transition-all group"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>PHONE</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

          </div>

          {/* Operational Manager Actions Card */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
              <span className="font-semibold uppercase tracking-wider">Operational Status</span>
              <span className="font-mono text-cyan-400">{verifiedUser.team}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => toggleCheckIn(verifiedUser.id)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold transition-colors ${
                  verifiedUser.isCheckedIn
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-red-500/20 hover:text-red-400'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{verifiedUser.isCheckedIn ? 'Mark Attendance (In)' : 'Check In Member'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onQuickTaskAssign) onQuickTaskAssign(verifiedUser);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Assign Task</span>
              </button>
            </div>
          </div>

        </div>

        {/* Floating Assistant Bot Button (Matching Screenshot 4 & 5 Bottom Right Icon) */}
        <div className="absolute bottom-6 right-6 z-30">
          <button
            onClick={() => setShowBotModal(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border-2 border-white"
            title="Ask EVENTOPS AI Assistant"
          >
            <Bot className="w-7 h-7" />
          </button>
        </div>

        {/* Assistant Bot Modal */}
        {showBotModal && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md p-6 z-40 flex flex-col justify-between animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Bot className="w-5 h-5" />
                <span>EVENTOPS Assistant</span>
              </div>
              <button
                onClick={() => setShowBotModal(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto space-y-3">
              <div className="bg-indigo-950/60 border border-indigo-800 text-indigo-200 text-xs p-3 rounded-xl">
                Hi! Ask me anything about member <strong className="text-white">{verifiedUser.name}</strong>, their department responsibilities, or event check-in details.
              </div>

              {botReply && (
                <div className="bg-gray-800 text-gray-100 text-xs p-3 rounded-xl border border-gray-700 font-medium leading-relaxed">
                  {botReply}
                </div>
              )}
            </div>

            <form onSubmit={handleBotAsk} className="flex gap-2">
              <input
                type="text"
                value={botQuery}
                onChange={(e) => setBotQuery(e.target.value)}
                placeholder="Ask e.g. 'What are their tasks?'"
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-500"
              >
                Ask
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
