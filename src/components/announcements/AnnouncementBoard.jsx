import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Plus, Pin, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export const AnnouncementBoard = () => {
  const { announcements, addAnnouncement, currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(true);
  const [priority, setPriority] = useState('NORMAL');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAnnouncement(title, content, isPinned, priority);
    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  const canPost = currentUser?.role === 'ADMIN' || currentUser?.role === 'FACULTY_COORDINATOR' || currentUser?.role === 'EVENT_COORDINATOR';

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" />
            <span>Official Event Announcements</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Broadcast important schedule changes, security updates, and instructions</p>
        </div>

        {canPost && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Broadcast</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {ann.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                    <Pin className="w-3 h-3" />
                    <span>PINNED BROADCAST</span>
                  </span>
                )}
                {ann.priority === 'HIGH' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" />
                    <span>HIGH PRIORITY</span>
                  </span>
                )}
              </div>

              <span className="text-xs text-gray-400 font-mono">
                {new Date(ann.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">{ann.title}</h3>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">{ann.content}</p>
            </div>

            <div className="pt-2 border-t border-gray-800 text-xs text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Author: <strong className="text-gray-200">{ann.author}</strong> ({ann.authorRole})</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>Post Official Broadcast</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule Update for Keynote Session"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Message Content *</label>
                <textarea
                  rows="4"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write clear details for team leads and volunteers..."
                  className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-amber-500"
                  />
                  <span>Pin to Top of Dashboard</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-semibold">Priority:</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-gray-950 border border-gray-800 text-white px-2 py-1 rounded focus:outline-none"
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="HIGH">HIGH PRIORITY</option>
                  </select>
                </div>
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
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
