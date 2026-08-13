import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';
import { 
  RotateCw, 
  Download, 
  Printer, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  Phone,
  Building,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

export const DigitalBadge = ({ userOverride = null, onOpenVerifiedView }) => {
  const { currentUser, ROLE_DEFINITIONS, regenerateQR } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [regenSuccess, setRegenSuccess] = useState(false);

  const badgeUser = userOverride || currentUser;
  if (!badgeUser) return null;

  const roleDef = ROLE_DEFINITIONS[badgeUser.role] || ROLE_DEFINITIONS.VOLUNTEER;

  const handleRegenerate = () => {
    regenerateQR(badgeUser.id);
    setRegenSuccess(true);
    setTimeout(() => setRegenSuccess(false), 2500);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(badgeUser.token);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('badge-qr-svg');
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
      downloadLink.download = `${badgeUser.name.replace(/\s+/g, '_')}_EVENTOPS_QR.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-xl mx-auto">
      
      {/* Top Banner Control */}
      <div className="w-full flex items-center justify-between mb-6 bg-gray-900/80 border border-gray-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-gray-200">Official EVENTOPS Identity Badge</h3>
            <p className="text-[11px] text-gray-400">Tap card to flip between Front & Back view</p>
          </div>
        </div>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold hover:bg-indigo-600/50 transition-colors"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>Flip Badge</span>
        </button>
      </div>

      {/* 3D Flippable Lanyard Badge Frame */}
      <div className="perspective-1000 w-[310px] sm:w-[340px] h-[480px] sm:h-[510px] relative mb-6 group cursor-pointer print-area">
        
        {/* Physical Lanyard Ring Graphic Top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none no-print">
          {/* Lanyard Strap */}
          <div className="w-8 h-8 bg-cyan-600 rounded-t border-t border-cyan-400 shadow-md flex items-center justify-center">
            <span className="text-[8px] font-mono text-cyan-100 font-bold">OPS</span>
          </div>
          {/* Metallic Clip Hook */}
          <div className="w-5 h-5 border-4 border-gray-300 rounded-full border-t-gray-500 shadow-md bg-gray-700 -mt-1" />
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full h-full relative transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          
          {/* ==================== FRONT OF BADGE (MATCHING SCREENSHOT 1) ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-slate-900 via-gray-950 to-black border-2 border-gray-800 shadow-2xl p-5 flex flex-col justify-between overflow-hidden backface-hidden shadow-cyan-950/40">
            
            {/* Top Hole Punch Slot */}
            <div className="w-12 h-3 mx-auto bg-gray-950 border border-gray-800 rounded-full mb-1 shadow-inner shrink-0" />

            {/* Top Bar Header */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono tracking-wider shrink-0 border-b border-gray-800/80 pb-2">
              <span className="font-extrabold text-white text-sm tracking-widest">MAJLIS</span>
              <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded uppercase font-sans font-semibold">
                {currentEvent?.code || 'EVT26'}
              </span>
            </div>

            {/* Giant Graphic Vertical Background Text "EVENTOPS" */}
            <div className="absolute top-16 right-2 text-7xl font-extrabold text-white/5 select-none tracking-tighter uppercase font-mono pointer-events-none rotate-90 origin-top-right">
              EVENTOPS
            </div>

            {/* Center Portrait Photo Cutout */}
            <div className="my-auto flex flex-col items-center justify-center relative z-10">
              <div className="relative w-40 h-48 sm:w-44 sm:h-52 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700/60 bg-gradient-to-b from-gray-800 to-gray-950 group-hover:border-cyan-500/50 transition-colors">
                <img
                  src={badgeUser.avatar}
                  alt={badgeUser.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Role Overlay Badge on Photo */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 text-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block ${roleDef.badgeColor}`}>
                    {badgeUser.roleTitle || roleDef.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Member Identity Info (Matching screenshot 1 format) */}
            <div className="text-center shrink-0 z-10 pt-2 border-t border-gray-800/60">
              <h2 className="text-xl font-black text-white tracking-wide">{badgeUser.name}</h2>
              <p className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">{badgeUser.roleTitle}</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-[11px] text-gray-400">
                <span>{badgeUser.department}</span>
                <span>•</span>
                <span className="font-mono text-gray-300">{badgeUser.batch}</span>
              </div>
            </div>

            {/* Bottom Right Logo Watermark */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
              <span>{badgeUser.token}</span>
              <div className="w-4 h-4 bg-cyan-500/20 border border-cyan-400/40 rounded flex items-center justify-center text-cyan-400 font-bold">
                OPS
              </div>
            </div>

          </div>

          {/* ==================== BACK OF BADGE (MATCHING SCREENSHOT 2) ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-black border-2 border-gray-800 shadow-2xl flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180">
            
            {/* Top Section: Geometric Semi-Circle Pattern (Matching screenshot 2) */}
            <div className="w-full h-32 bg-white relative p-3 flex flex-col justify-between overflow-hidden">
              
              {/* Hole punch slot */}
              <div className="w-12 h-3 mx-auto bg-black rounded-full mb-1" />

              {/* Geometric pattern SVGs */}
              <div className="absolute inset-0 opacity-90 pointer-events-none flex flex-wrap gap-1 p-2 justify-center items-center">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-t-full bg-black/90 transform rotate-180" />
                ))}
              </div>

              <div className="relative z-10 flex items-center justify-between text-black font-extrabold text-xs">
                <span>EVENTOPS ID</span>
                <span className="font-mono">{badgeUser.batch}</span>
              </div>
            </div>

            {/* Middle Section: Clean High-Contrast Scannable QR Code */}
            <div className="flex-1 bg-gray-950 p-4 flex flex-col items-center justify-center gap-3 border-t border-b border-gray-800">
              
              <div className="p-3 bg-white rounded-xl shadow-xl border-2 border-gray-200 hover:scale-105 transition-transform duration-300">
                <QRCodeSVG
                  id="badge-qr-svg"
                  value={badgeUser.token}
                  size={140}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: 'https://api.iconify.design/lucide:shield-check.svg',
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">DEPARTMENT OF {badgeUser.department.toUpperCase()}</p>
                <p className="text-xs text-gray-200 font-mono font-bold mt-0.5">{badgeUser.phone}</p>
              </div>

            </div>

            {/* Bottom Footer Info */}
            <div className="p-3 bg-black text-center text-[10px] text-gray-400 space-y-1">
              <div className="flex items-center justify-center gap-2 text-gray-300 font-semibold">
                <Building className="w-3 h-3 text-cyan-400" />
                <span>COLLEGE EVENT OPERATIONS CENTER</span>
              </div>
              <p className="text-cyan-400 font-mono font-bold">iedc.masc.edu.in</p>
            </div>

          </div>

        </div>
      </div>

      {/* Badge Control Actions Bar */}
      <div className="w-full bg-gray-900/90 border border-gray-800 rounded-xl p-4 space-y-3 no-print">
        
        {/* Token Quick Copy */}
        <div className="flex items-center justify-between bg-black/60 border border-gray-800 rounded-lg p-2.5">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <span className="text-gray-400 text-[10px] uppercase font-sans">Token ID:</span>
            <span className="font-bold">{badgeUser.token}</span>
          </div>
          <button
            onClick={handleCopyToken}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors flex items-center gap-1"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-semibold p-2.5 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download QR</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-semibold p-2.5 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Badge</span>
          </button>

          <button
            onClick={() => onOpenVerifiedView && onOpenVerifiedView(badgeUser)}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold p-2.5 rounded-lg shadow-md transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Verified Screen</span>
          </button>

        </div>

        {/* Regenerate Token Option (Admin / Authorized) */}
        {(currentUser?.role === 'ADMIN' || currentUser?.role === 'EVENT_COORDINATOR' || currentUser?.id === badgeUser.id) && (
          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-400">Security Emergency?</span>
            <button
              onClick={handleRegenerate}
              className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{regenSuccess ? 'QR Regenerated!' : 'Regenerate QR Token'}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
