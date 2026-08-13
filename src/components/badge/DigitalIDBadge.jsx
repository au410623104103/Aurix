import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useDC } from '../../context/DCContext';
import { processPhotoToStudioCutout } from '../../utils/aiCutoutEngine';
import { RotateCw, Download, Printer, ExternalLink, Upload, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';

export const DigitalIDBadge = ({ memberOverride = null, onOpenVerifiedView }) => {
  const { currentUser, updateMemberProfile, getActiveEvent } = useDC();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);
  const [isProcessingCutout, setIsProcessingCutout] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const member = memberOverride || currentUser;
  const activeEvt = getActiveEvent();

  if (!member) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-[32px] p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2A3BFF] flex items-center justify-center mx-auto shadow-inner font-black text-xl">
            ID
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              No Volunteer Enrolled
            </h2>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              No volunteer student records are currently selected or enrolled in the database.
            </p>
          </div>
          <a
            href="/?view=staff"
            className="w-full py-4 rounded-2xl bg-[#1D2B68] hover:bg-black text-white font-black text-xs uppercase tracking-wider transition-all block shadow-md"
          >
            Go to Staff Coordinator Portal →
          </a>
        </div>
      </div>
    );
  }

  // LIVE PRODUCTION VERCEL DEPLOYMENT URL (https://aurix-dun.vercel.app/profile/:id)
  const profileUrl = member.profileUrl || `https://aurix-dun.vercel.app/profile/${member.id}`;
  const activeEventTitle = activeEvt ? activeEvt.title : 'AURIX 2026 ANNUAL FEST';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingCutout(true);
    setUploadSuccess(false);

    try {
      const studioCutoutDataUrl = await processPhotoToStudioCutout(file);
      setCustomPhotoUrl(studioCutoutDataUrl);
      setUploadSuccess(true);
      if (updateMemberProfile) {
        updateMemberProfile(member.id, { heroCutout: studioCutoutDataUrl });
      }
    } catch (err) {
      console.error('Failed to process cutout:', err);
    } finally {
      setIsProcessingCutout(false);
    }
  };

  const handleRemovePhoto = () => {
    setCustomPhotoUrl(null);
    setUploadSuccess(false);
    if (updateMemberProfile) {
      updateMemberProfile(member.id, { heroCutout: null });
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('dc-badge-qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${member.name.replace(/\s+/g, '_')}_QR.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const rawCutout = customPhotoUrl || member.heroCutout || member.avatar || member.profile_image_url || (member.id === 'DC0001' ? '/karimulla_cutout.png' : null);
  const activeCutoutUrl = (rawCutout && typeof rawCutout === 'string') ? rawCutout : (member.id === 'DC0001' ? '/karimulla_cutout.png' : null);

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-xl mx-auto space-y-6 font-sans">
      
      {/* Top Banner Control */}
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-black text-xs">
            DC
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Physical Lanyard Identity Badge</h3>
            <p className="text-[11px] text-gray-500 font-mono">ID: {member.id} • Tap card to flip</p>
          </div>
        </div>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-4 py-2 rounded-xl bg-[#2A3BFF] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>FLIP CARD (FRONT / BACK)</span>
        </button>
      </div>

      {/* 3D FLIPPABLE ID BADGE CARD CONTAINER */}
      <div className="w-[340px] h-[540px] perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full h-full relative transition-transform duration-700 transform-style-3d cursor-pointer select-none ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* FRONT OF BADGE (EXACT ORIGINAL CARD FORMAT WITH PROMINENT BOLD WHITE "LEAD" TEXT) */}
          <div className="absolute inset-0 w-full h-full rounded-[22px] bg-[#08090C] border border-gray-800 shadow-2xl p-4 flex flex-col justify-between overflow-hidden backface-hidden">
            
            {/* Lanyard Punch Hole Bar */}
            <div className="w-10 h-2.5 mx-auto bg-black border border-gray-800 rounded-full shadow-inner shrink-0 z-20" />

            {/* Header Logos */}
            <div className="flex items-center justify-between z-10 pt-1">
              <span className="font-black text-lg text-white tracking-widest uppercase">AURIX</span>
              <span className="text-[9px] font-extrabold text-[#38BDF8] tracking-wider uppercase font-mono max-w-[170px] text-right truncate">
                {activeEventTitle}
              </span>
            </div>

            {/* "LEAD" CRISP WATERMARK: INCREASED WIDTH & LENGTH INSIDE CARD FRAME WITH CLEAR "E" & "A" */}
            <div className="absolute inset-x-0 top-[4%] h-[420px] flex items-center justify-center pointer-events-none z-0 overflow-hidden px-1.5 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_65%,transparent_100%)]">
              <span className="text-[138px] font-bold text-white/75 tracking-tight uppercase leading-none select-none font-sans scale-y-[2.5] w-full text-center flex justify-center items-center">
                LEAD
              </span>
            </div>

            {/* Member Photo Showcase with Slightly Zoomed Out Person & Dark Bottom Fade Overlay */}
            <div className="flex-1 flex items-center justify-center relative z-10 my-1 overflow-hidden">
              {activeCutoutUrl ? (
                <>
                  <img
                    src={activeCutoutUrl}
                    alt={member.name}
                    className="max-h-full max-w-full object-contain scale-[1.02] filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.75)] relative z-10 transition-transform duration-300"
                  />
                  {/* Dark Gradient Fade Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090C] via-[#08090C]/90 to-transparent z-20 pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-30">
                  <svg className="w-24 h-32 text-gray-400 block" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="86" r="52" fill="currentColor" />
                    <path d="M20 240c0-55 36-96 80-96s80 41 80 96" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Member Details Box */}
            <div className="z-10 bg-gradient-to-t from-[#08090C] via-[#08090C]/90 to-transparent pt-4 pb-1 space-y-1 text-center">
              <h2 className="text-xl font-black text-white uppercase tracking-wide truncate">
                {member.name}
              </h2>
              <p className="text-xs font-black text-[#38BDF8] tracking-widest uppercase">
                {member.roleTitle || member.team || 'MEDIA & MARKETING LEAD'}
              </p>
              <p className="text-[10px] font-mono font-bold text-gray-400">
                {member.batch || '2 0 2 4 - 2 0 2 8'} • ID: {member.id}
              </p>
            </div>

          </div>

          {/* BACK OF BADGE */}
          <div className="absolute inset-0 w-full h-full rounded-[22px] bg-[#08090C] border border-gray-800 shadow-2xl p-4 flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180">
            
            <div className="w-10 h-2.5 mx-auto bg-black border border-gray-800 rounded-full shadow-inner shrink-0 z-20" />

            <div className="w-full h-32 pt-2 px-1 flex flex-col items-center justify-center pointer-events-none z-10 shrink-0">
              <div className="w-full grid grid-cols-4 gap-2">
                <div className="h-10 bg-white rounded-t-full" />
                <div className="h-10 bg-white rounded-t-full" />
                <div className="h-10 bg-white rounded-t-full" />
                <div className="h-10 bg-white rounded-t-full" />

                <div className="h-10 bg-white rounded-b-full" />
                <div className="h-10 bg-white rounded-b-full" />
                <div className="h-10 bg-white rounded-b-full" />
                <div className="h-10 bg-white rounded-b-full" />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-3 z-10">
              <button
                type="button"
                onClick={() => onOpenVerifiedView && onOpenVerifiedView(member)}
                className="p-3 bg-white rounded-xl shadow-2xl border border-gray-200 cursor-pointer hover:scale-105 transition-transform group relative text-left border-none"
                title="Click/Tap to view verified profile"
              >
                <QRCodeSVG
                  id="dc-badge-qr-svg"
                  value={profileUrl}
                  size={130}
                  level="H"
                  includeMargin={true}
                />
                <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold p-1 text-center backdrop-blur-[2px]">
                  <ExternalLink className="w-5 h-5 mb-1 text-cyan-300" />
                  <span>Tap to Open Profile</span>
                </div>
              </button>

              <div className="text-center space-y-1 pt-1">
                <p className="text-[10px] text-gray-300 font-extrabold tracking-widest uppercase">
                  DEPARTMENT OF {member.department}
                </p>
                <p className="text-xs text-white font-mono font-bold">
                  {member.phone}
                </p>
                <div className="pt-1 text-[9px] text-gray-400 font-mono">
                  iedc.masc.edu.in
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 space-y-3 no-print shadow-sm">
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs">
          <span className="text-gray-600 font-mono text-[11px] truncate">{profileUrl}</span>
          <button
            onClick={handleCopyUrl}
            className="px-3 py-1 rounded-lg bg-black text-white font-bold text-xs shrink-0 cursor-pointer"
          >
            {isCopied ? 'Copied' : 'Copy URL'}
          </button>
        </div>

        <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <span>🔒</span> Permanent Production Profile URL:
            </span>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-950 px-2 py-0.5 rounded-full font-mono font-bold">
              Mandatory Production Standard
            </span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-snug">
            QR contains <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-950">{profileUrl}</code>. Never generates temporary, localhost, or Pinggy URLs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={handleDownloadQR}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-gray-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span>QR PNG</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-gray-800"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ID</span>
          </button>

          {onOpenVerifiedView && (
            <button
              onClick={() => onOpenVerifiedView(member)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-gray-800"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verified Page</span>
            </button>
          )}

          <label className="p-2.5 rounded-xl bg-[#2A3BFF] hover:bg-blue-700 font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5" />
            <span>{isProcessingCutout ? 'Cutout...' : 'Upload Photo'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={isProcessingCutout}
            />
          </label>
        </div>

        {uploadSuccess && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Studio Photo Cutout Applied!
            </span>
            <button
              onClick={handleRemovePhoto}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
