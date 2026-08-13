import React, { useState, useEffect } from 'react';
import { DCProvider, useDC } from './context/DCContext';
import { PublicProfileView } from './components/profile/PublicProfileView';
import { StaffCoordinatorView } from './components/coordinator/StaffCoordinatorView';
import { DigitalIDBadge } from './components/badge/DigitalIDBadge';
import { QRScanner } from './components/scanner/QRScanner';
import { RegistrationModal } from './components/auth/RegistrationModal';
import { SetupWizard } from './components/setup/SetupWizard';
import { SplashScreen } from './components/splash/SplashScreen';
import { AnimatePresence } from 'framer-motion';
import { 
  Scan as ScanIcon,
  QrCode,
  Users,
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  UserPlus,
  ShieldCheck,
  Link as LinkIcon
} from 'lucide-react';

const ExactVideoEcosystemContent = () => {
  const { isSetupWizardCompleted, getMemberByIdOrToken, currentUser, members } = useDC();

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    const searchParams = new URLSearchParams(window.location.search);
    const viewParam = searchParams.get('view');
    const profileParam = searchParams.get('profile') || searchParams.get('id');
    const pathname = window.location.pathname;

    if (viewParam === 'badge' || viewParam === 'staff') return false;
    return Boolean(profileParam || pathname.includes('/profile/') || viewParam === 'profile');
  });

  const [viewMode, setViewMode] = useState(() => {
    if (typeof window === 'undefined') return 'staff';
    const searchParams = new URLSearchParams(window.location.search);
    const viewParam = searchParams.get('view');
    const profileParam = searchParams.get('profile') || searchParams.get('id');
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

    if (profileParam || pathname.includes('/profile/')) return 'profile';
    if (viewParam === 'badge') return 'badge';
    if (viewParam === 'profile') return 'profile';
    return 'staff'; // Default to Staff Coordinator Portal!
  });
  const [activeProfileMember, setActiveProfileMember] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [invalidProfileRequested, setInvalidProfileRequested] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  // Separate URL Routing Engine (/profile/DC0001, ?view=profile, ?view=staff, ?view=badge)
  useEffect(() => {
    const handleUrlCheck = () => {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      let targetProfileId = searchParams.get('profile') || searchParams.get('id');
      
      // Extract from path e.g. /profile/DC0001 or /profile/VOL-101
      if (!targetProfileId && pathname.includes('/profile/')) {
        const pathSegments = pathname.split('/').filter(Boolean);
        const idx = pathSegments.indexOf('profile');
        if (idx !== -1 && pathSegments[idx + 1]) {
          targetProfileId = pathSegments[idx + 1];
        }
      }

      const viewParam = searchParams.get('view');

      if (targetProfileId) {
        setViewMode('profile');
        const found = getMemberByIdOrToken(targetProfileId);
        if (found) {
          setActiveProfileMember(found);
          setInvalidProfileRequested(false);
        } else {
          setInvalidProfileRequested(true);
        }
      } else if (viewParam === 'staff') {
        setViewMode('staff');
        setShowSplash(false);
        setInvalidProfileRequested(false);
      } else if (viewParam === 'badge') {
        setViewMode('badge');
        setShowSplash(false);
        setInvalidProfileRequested(false);
      } else if (viewParam === 'profile') {
        setViewMode('profile');
        setInvalidProfileRequested(false);
      }
    };

    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    return () => window.removeEventListener('popstate', handleUrlCheck);
  }, [members]);

  const changeViewMode = (mode) => {
    setInvalidProfileRequested(false);
    setViewMode(mode);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('view', mode);
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  };

  const currentActiveUser = activeProfileMember || currentUser || (members && members.length > 0 ? members[0] : null);

  const handleScanComplete = (scannedUser) => {
    setIsScannerOpen(false);
    setActiveProfileMember(scannedUser);
    changeViewMode('profile');
  };

  if (!isSetupWizardCompleted) {
    return <SetupWizard />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans selection:bg-[#2A3BFF] selection:text-white relative">
      
      {/* AURIX Animated Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen duration={1000} onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Top Navigation Bar (Hidden when viewing public student profile via QR scan) */}
      {viewMode !== 'profile' && (
        <header className="bg-[#0E0D14] border-b border-gray-800 px-4 sm:px-8 py-2.5 sticky top-0 z-40 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & Replay Splash Trigger */}
          <button 
            onClick={() => setShowSplash(true)}
            className="flex items-center gap-2.5 group text-left cursor-pointer border-none bg-transparent p-0"
            title="Replay AURIX Splash Screen"
          >
            <img src="/dc_shield_logo.png" alt="DC Logo" className="h-7 w-auto object-contain" />
            <div>
              <span className="font-black text-sm text-white tracking-widest block uppercase">AURIX</span>
              <span className="text-[9px] text-[#38BDF8] font-mono block font-bold">Replay Splash ✦</span>
            </div>
          </button>

          {/* Separate URL Router Buttons (?view=profile & ?view=staff) */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/15 text-xs font-bold backdrop-blur-md">
            <button
              onClick={() => changeViewMode('profile')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'profile' ? 'bg-[#2A3BFF] text-white shadow-xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>Volunteer Profile</span>
              <span className="text-[10px] opacity-60 font-mono hidden md:inline">?view=profile</span>
            </button>

            <button
              onClick={() => changeViewMode('staff')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'staff' ? 'bg-[#2A3BFF] text-white shadow-xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>Staff Web Portal</span>
              <span className="text-[10px] opacity-60 font-mono hidden md:inline">?view=staff</span>
            </button>

            <button
              onClick={() => changeViewMode('badge')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer hidden sm:flex items-center gap-1.5 ${
                viewMode === 'badge' ? 'bg-[#2A3BFF] text-white shadow-xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>Digital ID Badge</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            
            <button
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-1.5 bg-[#2A3BFF] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <ScanIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            {/* Member Selector Dropdown */}
            {currentActiveUser && (
              <div className="relative">
                <button
                  onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 cursor-pointer"
                >
                  {currentActiveUser.avatar ? (
                    <img src={currentActiveUser.avatar} alt="User" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                      {currentActiveUser.name ? currentActiveUser.name.charAt(0) : 'U'}
                    </div>
                  )}
                  <span className="hidden md:inline">{currentActiveUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {showMemberDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-50 text-gray-900 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Member Profile</p>
                    </div>
                    <div className="max-h-60 overflow-y-auto pr-1 space-y-1">
                      {members.map(m => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setActiveProfileMember(m);
                            setShowMemberDropdown(false);
                            changeViewMode('profile');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            currentActiveUser.id === m.id ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                              {m.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold">{m.name} ({m.id})</div>
                              <div className="text-[10px] text-gray-400">{m.roleTitle}</div>
                            </div>
                          </div>
                          {currentActiveUser.id === m.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {invalidProfileRequested ? (
          <div className="w-full min-h-[80vh] flex items-center justify-center p-4 font-sans text-slate-900">
            <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-[32px] p-8 text-center space-y-6 shadow-xl">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                  Volunteer Not Found
                </h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  The requested volunteer identity does not exist in the database or has been deactivated.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-extrabold tracking-wide uppercase">
                Please Contact Staff Coordinator.
              </div>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'profile' && (
              <PublicProfileView
                memberOverride={currentActiveUser}
                onClose={() => changeViewMode('staff')}
                onReplaySplash={() => setShowSplash(true)}
              />
            )}

            {viewMode === 'staff' && (
              <StaffCoordinatorView
                onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
                onSwitchToProfile={(m) => {
                  setActiveProfileMember(m);
                  changeViewMode('profile');
                }}
                onSwitchToBadge={(m) => {
                  setActiveProfileMember(m);
                  changeViewMode('badge');
                }}
                onScanClick={() => setIsScannerOpen(true)}
              />
            )}

            {viewMode === 'badge' && (
              <DigitalIDBadge
                memberOverride={currentActiveUser}
                onOpenVerifiedView={(m) => {
                  setActiveProfileMember(m);
                  changeViewMode('profile');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* MODALS */}
      {isScannerOpen && (
        <QRScanner
          onScanComplete={handleScanComplete}
          onClose={() => setIsScannerOpen(false)}
        />
      )}

      {isRegisterModalOpen && (
        <RegistrationModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSuccess={(newMember) => {
            setActiveProfileMember(newMember);
            changeViewMode('badge'); // IMMEDIATELY OPEN DIGITAL ID E-BADGE (FRONT & BACK CARD)
          }}
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <DCProvider>
      <ExactVideoEcosystemContent />
    </DCProvider>
  );
}
