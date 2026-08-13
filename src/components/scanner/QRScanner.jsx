import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { useDC } from '../../context/DCContext';
import { 
  Scan as ScanIcon, 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  ShieldAlert,
  Ban
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QRScanner = ({ onScanComplete, onClose }) => {
  const { members, getMemberByIdOrToken } = useDC();
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play verification chime audio tone
  const playVerificationChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.log('Audio playback unavailable', e);
    }
  };

  const handleSuccessfulScan = (query) => {
    const foundUser = getMemberByIdOrToken(query);
    if (foundUser) {
      // CHECK IF STAFF HAS DENIED ACCESS FOR THIS VOLUNTEER
      if (foundUser.status === 'DENIED') {
        setScanError(`🛑 ACCESS DENIED: QR Code for ${foundUser.name} (${foundUser.id}) has been REVOKED by Staff Coordinator. Please meet Mam in administration.`);
        setScanResult(null);
        return;
      }

      setScanResult(foundUser);
      setScanError(null);
      playVerificationChime();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        if (onScanComplete) onScanComplete(foundUser);
      }, 1200);
    } else {
      setScanError(`Unrecognized Identity Token/URL: "${query}". Please scan a valid DC Member QR Badge.`);
      setScanResult(null);
    }
  };

  // Initialize HTML5 QR Scanner
  useEffect(() => {
    let html5QrcodeScanner;
    const scannerElementId = 'dc-qr-reader';
    
    const el = document.getElementById(scannerElementId);
    if (el && cameraActive) {
      try {
        html5QrcodeScanner = new Html5QrcodeScanner(
          scannerElementId,
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true
          },
          /* verbose= */ false
        );

        html5QrcodeScanner.render(
          (decodedText) => {
            html5QrcodeScanner.clear();
            handleSuccessfulScan(decodedText);
          },
          (error) => {}
        );
      } catch (err) {
        console.log('Camera error', err);
      }
    }

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(e => console.error(e));
      }
    };
  }, [cameraActive]);

  // File Scanner
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode('dc-qr-reader-file-temp');
    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        handleSuccessfulScan(decodedText);
      })
      .catch(err => {
        setScanError('Unable to detect QR code in uploaded image.');
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div id="dc-qr-reader-file-temp" className="hidden" />

      <div className="w-full max-w-lg bg-slate-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative font-sans">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1D2B68] border border-blue-400 flex items-center justify-center text-white font-black text-xs">
              DC
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wide">DC QR Scanner</h2>
              <p className="text-[11px] text-gray-400">Scan physical card QR or dc.dhaanish.edu profile URL</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            </button>

            {onClose && (
              <button onClick={onClose} className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1 flex flex-col items-center justify-center">
          
          {scanResult ? (
            <div className="w-full py-8 bg-emerald-950/80 border-2 border-emerald-500/60 rounded-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700">
                  ✓ VERIFIED IDENTITY ({scanResult.id})
                </span>
                <h3 className="text-2xl font-black text-white mt-2">{scanResult.name}</h3>
                <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{scanResult.roleTitle || scanResult.team}</p>
                <p className="text-xs text-gray-300 mt-1">{scanResult.department}</p>
              </div>
              <div className="pt-2 text-xs text-emerald-300 font-mono">
                Opening Profile Page (dc.dhaanish.edu/profile/{scanResult.id})...
              </div>
            </div>
          ) : (
            <>
              {/* Camera Scanner Container */}
              <div className="w-full max-w-sm aspect-square bg-black rounded-2xl border-2 border-gray-800 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
                {cameraActive ? (
                  <div className="w-full h-full relative">
                    <div id="dc-qr-reader" className="w-full h-full" />
                    <div className="absolute inset-x-4 scanner-laser z-20 pointer-events-none" />
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <Camera className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                    <p className="text-xs text-gray-300">Click below to activate device webcam scanner or test simulator</p>
                    <button
                      onClick={() => setCameraActive(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#2A3BFF] hover:bg-blue-700 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
                    >
                      Turn On Camera Scanner
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center font-mono">
                "Place the DC QR Code inside the frame"
              </p>

              {scanError && (
                <div className="w-full bg-red-950/90 border border-red-700 text-red-200 text-xs p-4 rounded-2xl flex items-start gap-2.5 shadow-lg">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="font-bold leading-relaxed">{scanError}</span>
                </div>
              )}

              {/* INSTANT SIMULATOR (1-Click Test) */}
              <div className="w-full bg-slate-950 border border-gray-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant Member QR Simulator</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Click to scan member:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {members.slice(0, 4).map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleSuccessfulScan(m.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-colors cursor-pointer group ${
                        m.status === 'DENIED' ? 'bg-red-950/30 border-red-800' : 'bg-slate-900 hover:bg-[#1D2B68] border-gray-800'
                      }`}
                    >
                      <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover border border-cyan-400/40 shrink-0" />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-gray-200 group-hover:text-cyan-300 line-clamp-1 flex items-center gap-1">
                          <span>{m.name}</span>
                          {m.status === 'DENIED' && <Ban className="w-3 h-3 text-red-500 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-gray-400 line-clamp-1">{m.team || m.roleTitle}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Or scan image file:</span>
                  <label className="cursor-pointer text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload QR Image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
