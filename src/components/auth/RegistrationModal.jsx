import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { processPhotoToStudioCutout } from '../../utils/aiCutoutEngine';
import { OFFICIAL_AURIX_TEAMS } from '../../data/dcMockData';
import { X, Upload, Sparkles, UserCheck, CheckCircle2, User, Phone, Mail, Hash, Building2, Users } from 'lucide-react';

export const RegistrationModal = ({ isOpen, onClose, onSuccess }) => {
  const { registerMember, departments } = useDC();

  const teamOptions = OFFICIAL_AURIX_TEAMS.filter(t => t !== 'ALL');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    registerNo: '',
    department: departments[0]?.name || 'CSE - Computer Science & Engineering',
    team: teamOptions[0] || 'Media Team',
    heroCutout: null
  });

  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoSuccessMessage, setPhotoSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingPhoto(true);
    setPhotoSuccessMessage(false);

    try {
      // Process uploaded image via AI Cutout Engine:
      // 1. Clears background completely (transparent PNG)
      // 2. Adds crisp white outerline contour
      // 3. Fades dark at the bottom up to hip level
      const studioCutoutPng = await processPhotoToStudioCutout(file);
      setFormData(prev => ({ ...prev, heroCutout: studioCutoutPng }));
      setPhotoSuccessMessage(true);
    } catch (err) {
      console.error('Error processing photo cutout:', err);
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newMember = registerMember({
      ...formData,
      roleTitle: formData.team,
      heroCutout: formData.heroCutout || null,
      avatar: formData.heroCutout || null
    });

    if (onSuccess) onSuccess(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] font-sans">
        
        {/* Modal Header */}
        <div className="bg-[#1D2B68] text-white px-8 py-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center font-black text-lg border border-white/20">
              DC
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide">Add New Member / Volunteer</h3>
              <p className="text-xs text-gray-300 font-bold">Dhaanish Chennai College of Engineering</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 text-sm font-sans">
          
          {/* PHOTO ADDING / AI CUTOUT BOX */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-black text-gray-900 text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-[#2A3BFF]" />
                <span className="uppercase tracking-wider">Photo Adding & AI Cutout Engine</span>
              </div>
              <span className="text-xs bg-[#2A3BFF] text-white px-3 py-1 rounded-full font-black uppercase">AUTOPILOT</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
              Upload photo when student arrives. Our AI clears background, adds a crisp white outerline contour, and fades the bottom dark up to hip level!
            </p>

            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2A3BFF] hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md transition-all shrink-0">
                <Upload className="w-4.5 h-4.5" />
                <span>{isProcessingPhoto ? 'AI Processing Photo...' : 'Upload Student Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isProcessingPhoto}
                />
              </label>

              {photoSuccessMessage && (
                <div className="flex items-center gap-2 text-emerald-700 font-black text-xs sm:text-sm bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>White Contour & Hip Fade Cutout Ready!</span>
                </div>
              )}
            </div>

            {/* Cutout Preview Thumbnail OR Empty Silhouette Format */}
            {formData.heroCutout ? (
              <div className="pt-2 flex items-center gap-4">
                <div className="w-20 h-24 bg-black rounded-2xl border border-gray-800 p-1.5 flex items-center justify-center overflow-hidden relative shadow-md">
                  <span className="absolute text-[26px] font-black text-white/20">DC</span>
                  <img
                    src={formData.heroCutout}
                    alt="Cutout Preview"
                    className="h-full object-contain relative z-10 filter drop-shadow-md"
                  />
                </div>
                <div className="text-xs sm:text-sm space-y-0.5">
                  <p className="font-black text-gray-900">Studio Cutout & Hip Fade Generated</p>
                  <p className="text-gray-500 font-mono text-xs">Clear background • White contour • Dark hip fade mask</p>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-4">
                <div className="w-20 h-24 bg-[#ECE7F9] rounded-2xl border border-purple-200/80 p-1.5 flex items-center justify-center overflow-hidden relative shadow-xs">
                  <User className="w-12 h-12 text-[#C9C1EA]" />
                </div>
                <div className="text-xs sm:text-sm space-y-0.5">
                  <p className="font-black text-gray-800">Empty Silhouette Format</p>
                  <p className="text-gray-500 text-xs font-medium">No photo uploaded yet. Mam can add student photo anytime.</p>
                </div>
              </div>
            )}
          </div>

          {/* FORM FIELDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* 1. MEMBER NAME */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#2A3BFF]" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Karimulla SK / Anshif TK"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF]"
              />
            </div>

            {/* 2. PHONE NUMBER */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#2A3BFF]" />
                Phone Number (Digits Only) *
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.phone}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                  setFormData(prev => ({ ...prev, phone: numbersOnly }));
                }}
                placeholder="e.g. 9074389868"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF] font-mono"
              />
            </div>

            {/* 3. EMAIL ADDRESS */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#2A3BFF]" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="student@dhaanish.edu"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF]"
              />
            </div>

            {/* 4. REGISTER NUMBER */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-[#2A3BFF]" />
                Register Number (Digits Only) *
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.registerNo}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                  setFormData(prev => ({ ...prev, registerNo: numbersOnly }));
                }}
                placeholder="e.g. 310624104050"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF] font-mono"
              />
            </div>

            {/* 5. DEPARTMENT */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#2A3BFF]" />
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF]"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* 6. TEAM ASSIGNMENT */}
            <div>
              <label className="block text-gray-900 font-black mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#2A3BFF]" />
                Team Assignment *
              </label>
              <select
                value={formData.team}
                onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-gray-900 font-black text-sm sm:text-base focus:outline-none focus:border-[#2A3BFF]"
              >
                {teamOptions.map(tName => (
                  <option key={tName} value={tName}>{tName}</option>
                ))}
              </select>
            </div>

          </div>

          {/* MODAL ACTIONS */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-black text-sm sm:text-base transition-colors shadow-md flex items-center gap-2.5 cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Add Member & Increase Count (+1)</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
