import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  QrCode, 
  Scan as ScanIcon, 
  Sparkles, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onScanClick }) => {
  const { currentUser, members } = useDC();
  const [showMemberSwitcher, setShowMemberSwitcher] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Logo from Video */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xs shadow-md">
            DC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-lg text-gray-900">
                DHAANISH
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 tracking-widest uppercase font-mono">
                COLLEGE OF ENG.
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">Digital Identity & Event Operations</p>
          </div>
        </div>

        {/* Center: Scanner Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onScanClick}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all hover:scale-[1.02]"
          >
            <ScanIcon className="w-4 h-4" />
            <span>SCAN QR BADGE</span>
          </button>
        </div>

        {/* Right side Controls & Switcher */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          <button
            onClick={onScanClick}
            className="md:hidden flex items-center justify-center p-2 rounded-xl bg-gray-100 text-gray-900"
            title="Scan QR Code"
          >
            <ScanIcon className="w-5 h-5" />
          </button>

          {/* Quick Profile Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowMemberSwitcher(!showMemberSwitcher)}
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Demo Switcher</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showMemberSwitcher && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Demo Switcher</p>
                  <p className="text-xs text-gray-600">Select member profile to view:</p>
                </div>
                <div className="max-h-60 overflow-y-auto pr-1 space-y-1">
                  {members.map(m => {
                    const isActive = currentUser?.id === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setShowMemberSwitcher(false);
                          window.location.href = `?profile=${m.id}`;
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isActive ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <div className="font-bold">{m.name} ({m.id})</div>
                            <div className="text-[10px] text-gray-400">{m.roleTitle} • {m.department}</div>
                          </div>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Pill */}
          <button
            onClick={() => setActiveTab('my-badge')}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-7 h-7 rounded-full object-cover border border-indigo-600"
            />
            <div className="text-left hidden lg:block">
              <div className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</div>
              <div className="text-[10px] text-indigo-600 font-mono leading-tight">{currentUser?.id}</div>
            </div>
            <QrCode className="w-4 h-4 text-indigo-600 ml-1" />
          </button>

        </div>
      </div>
    </header>
  );
};
