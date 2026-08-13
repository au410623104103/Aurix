import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen = ({ onFinish, duration = 1000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
      onClick={onFinish}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#1D2B68]/30 blur-[100px] pointer-events-none" />

      {/* Skip Button Top Right */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onFinish) onFinish();
          }}
          className="text-[11px] font-mono tracking-widest text-gray-300 hover:text-white uppercase transition-colors px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
        >
          SKIP ↗
        </button>
      </div>

      {/* PERFECTLY FRAMED CRISP IMAGE SHOWCASE (NEVER HUGE OR BLOWN UP) */}
      <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
        <motion.img
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src="/aurix_splash.png"
          alt="AURIX - Your Identity Beyond The Card"
          className="max-w-[420px] max-h-[82vh] w-auto h-auto object-contain filter drop-shadow-[0_10px_30px_rgba(42,59,255,0.4)]"
        />
      </div>

      {/* Sleek Progress Loader Bar */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-40 flex flex-col items-center gap-1.5 z-30 pointer-events-none">
        <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2A3BFF] via-[#38BDF8] to-white rounded-full shadow-[0_0_8px_#38BDF8]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
