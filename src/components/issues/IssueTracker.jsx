import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldAlert, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  X,
  Send
} from 'lucide-react';

export const IssueTracker = ({ isModalOpen, setIsModalOpen }) => {
  const { issues, reportIssue, updateIssueStatus, EMERGENCY_CONTACTS, currentUser } = useAuth();
  
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [issueSeverity, setIssueSeverity] = useState('HIGH');

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    if (!issueTitle.trim()) return;

    reportIssue({
      title: issueTitle,
      description: issueDesc,
      location: issueLocation || 'Main Campus Venue',
      severity: issueSeverity
    });

    setIssueTitle('');
    setIssueDesc('');
    setIssueLocation('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-red-950/40 via-gray-900 to-gray-900 border border-red-900/40 rounded-2xl p-5">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            <span>Emergency Incident & Issue Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Report ground glitches, equipment failures, VVIP delays, or medical emergencies immediately</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Report New Incident</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Incident Logs */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Incident Log ({issues.length})</h3>

          <div className="space-y-3">
            {issues.map(iss => (
              <div key={iss.id} className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${
                      iss.severity === 'CRITICAL' || iss.severity === 'HIGH' 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    }`}>
                      {iss.severity} SEVERITY
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{iss.location}</span>
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    iss.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                    iss.status === 'IN_PROGRESS' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' :
                    'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  }`}>
                    {iss.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-white">{iss.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{iss.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span>Reported by: <strong className="text-gray-200">{iss.reportedBy}</strong></span>
                    <span>•</span>
                    <span>{new Date(iss.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {iss.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateIssueStatus(iss.id, 'RESOLVED')}
                        className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Emergency Contacts Directory */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Quick Emergency Contacts</h3>

          <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-3">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{contact.role}</div>
                <div className="text-xs font-bold text-white">{contact.name}</div>
                <div className="text-[11px] text-gray-400 font-mono">{contact.location}</div>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-2 text-xs text-emerald-400 hover:underline font-mono font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* New Incident Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span>Report Emergency Incident</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitIssue} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Issue Title / Subject *</label>
                <input
                  type="text"
                  required
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="e.g. Main Auditorium Projector HDMI Cable Malfunction"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Location / Zone *</label>
                <input
                  type="text"
                  required
                  value={issueLocation}
                  onChange={(e) => setIssueLocation(e.target.value)}
                  placeholder="e.g. Gate 1 Security Desk / Room 302"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Severity Level</label>
                <select
                  value={issueSeverity}
                  onChange={(e) => setIssueSeverity(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
                >
                  <option value="MEDIUM">MEDIUM (Needs attention within 30 min)</option>
                  <option value="HIGH">HIGH (Urgent equipment/VVIP need)</option>
                  <option value="CRITICAL">CRITICAL (Immediate safety/medical/power stop)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description & Immediate Action Needed</label>
                <textarea
                  rows="3"
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  placeholder="Describe what happened and what resolution is required..."
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg"
                >
                  Submit Incident Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
