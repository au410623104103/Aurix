import React, { useState, useRef, useEffect } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  ArrowLeft, 
  Settings, 
  X,
  Bot,
  Send,
  Sparkles,
  Download,
  Globe,
  Check,
  CreditCard,
  Play,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  ShieldAlert,
  Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Multi-Language Translation Dictionary (English, Telugu, Tamil, Hindi)
const TRANSLATIONS = {
  en: {
    executiveLead: 'EXECUTIVE LEAD',
    mediaLead: 'MEDIA LEAD',
    computerScience: 'COMPUTER SCIENCE',
    dhaanishCollege: 'Dhaanish Chennai College of Engineering',
    phone: 'PHONE',
    whatsapp: 'WHATSAPP',
    email: 'EMAIL',
    linkedin: 'LINKEDIN',
    instagram: 'INSTAGRAM',
    settingsTitle: 'Settings & Preferences',
    selectLanguage: 'Select Preferred Language',
    downloadSection: 'Download ID Cards',
    downloadFront: 'Download Front ID Card (PNG)',
    downloadBack: 'Download Back ID Card (PNG)',
    downloadVcf: 'Download Phone Contact (vCard)',
    replaySplash: 'Replay AURIX Splash Screen',
    close: 'Close',
    confirmCloseTitle: 'Close Profile?',
    confirmCloseMessage: 'Are you sure you want to close this page?',
    yes: 'YES',
    no: 'NO',
    settingsBtn: 'SETTINGS',
    geminiBtn: 'GEMINI AI'
  },
  te: {
    executiveLead: 'ఎగ్జిక్యూటివ్ లీడ్',
    mediaLead: 'మీడియా లీడ్',
    computerScience: 'కంప్యూటర్ సైన్స్',
    dhaanishCollege: 'ధానిష్ కాలేజ్ ఆఫ్ ఇంజనీరింగ్',
    phone: 'ఫోన్',
    whatsapp: 'వాట్సాప్',
    email: 'ఈమెయిల్',
    linkedin: 'లింక్డ్ఇన్',
    instagram: 'ఇన్‌స్టాగ్రామ్',
    settingsTitle: 'సెట్టింగ్‌లు & ప్రాధాన్యతలు',
    selectLanguage: 'భాషను ఎంచుకోండి',
    downloadSection: 'ID కార్డులను డౌన్‌లోడ్ చేయండి',
    downloadFront: 'ఫ్రంట్ ID కార్డ్ డౌన్‌లోడ్ చేయండి (PNG)',
    downloadBack: 'బ్యాక్ ID కార్డ్ డౌన్‌లోడ్ చేయండి (PNG)',
    downloadVcf: 'ఫోన్ కాంటాక్ట్ డౌన్‌లోడ్ చేయండి (vCard)',
    replaySplash: 'AURIX స్ప్లాష్ స్క్రీన్‌ని మళ్లీ ప్లే చేయండి',
    close: 'మూసివేయి',
    confirmCloseTitle: 'ప్రొఫైల్‌ను మూసివేయాలా?',
    confirmCloseMessage: 'మీరు నిజంగా ఈ పేజీని మూసివేయాలనుకుంటున్నారా?',
    yes: 'అవును',
    no: 'కాదు',
    settingsBtn: 'సెట్టింగ్‌లు',
    geminiBtn: 'జెమిని AI'
  },
  ta: {
    executiveLead: 'செயல்முறைத் தலைவர்',
    mediaLead: 'ஊடகத் தலைவர்',
    computerScience: 'கணினி அறிவியல்',
    dhaanishCollege: 'தானிஷ் பொறியியல் கல்லூரி',
    phone: 'தொலைபேசி',
    whatsapp: 'வாட்ஸ்அப்',
    email: 'மின்னஞ்சல்',
    linkedin: 'லிங்க்ட்இன்',
    instagram: 'இன்ஸ்டாகிராம்',
    settingsTitle: 'அமைப்புகள் & விருப்பங்கள்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    downloadSection: 'ஐடி கார்டுகளைப் பதிவிறக்கவும்',
    downloadFront: 'முன் ஐடி கார்டைப் பதிவிறக்கவும் (PNG)',
    downloadBack: 'பின் ஐடி கார்டைப் பதிவிறக்கவும் (PNG)',
    downloadVcf: 'தொடர்பைப் பதிவிறக்கவும் (vCard)',
    replaySplash: 'AURIX ஸ்பிளாஷ் திரையை மீண்டும் இயக்கவும்',
    close: 'மூடு',
    confirmCloseTitle: 'சுயவிவரத்தை மூடவா?',
    confirmCloseMessage: 'நிச்சயமாக இந்தப் பக்கத்தை மூட விரும்புகிறீர்களா?',
    yes: 'ஆம்',
    no: 'இல்லை',
    settingsBtn: 'அமைப்புகள்',
    geminiBtn: 'ஜெமினி AI'
  },
  hi: {
    executiveLead: 'कार्यकारी प्रमुख',
    mediaLead: 'मीडिया प्रमुख',
    computerScience: 'कंप्यूटर विज्ञान',
    dhaanishCollege: 'धानिश कॉलेज ऑफ इंजीनियरिंग',
    phone: 'फोन',
    whatsapp: 'व्हाट्सएप',
    email: 'ईमेल',
    linkedin: 'लिंक्डइन',
    instagram: 'इंस्टाग्राम',
    settingsTitle: 'सेटिंग्स और प्राथमिकताएं',
    selectLanguage: 'भाषा चुनें',
    downloadSection: 'आईडी कार्ड डाउनलोड करें',
    downloadFront: 'फ्रंट आईडी कार्ड डाउनलोड करें (PNG)',
    downloadBack: 'बैक आईडी कार्ड डाउनलोड करें (PNG)',
    downloadVcf: 'संपर्क डाउनलोड करें (vCard)',
    replaySplash: 'AURIX स्प्लैश स्क्रीन फिर से चलाएं',
    close: 'बंद करें',
    confirmCloseTitle: 'प्रोफ़ाइल बंद करें?',
    confirmCloseMessage: 'क्या आप वाकई इस पेज को बंद करना चाहते हैं?',
    yes: 'हाँ',
    no: 'नहीं',
    settingsBtn: 'सेटिंग्स',
    geminiBtn: 'जेमिनी AI'
  }
};

export const PublicProfileView = ({ memberOverride = null, onClose = null, onReplaySplash = null }) => {
  const { currentUser, getVolunteerActiveAssignment, getActiveEvent } = useDC();
  const member = memberOverride || currentUser;

  const [showMobileSplash, setShowMobileSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  const [lang, setLang] = useState('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const activeAssignment = getVolunteerActiveAssignment(member);
  const activeEvt = getActiveEvent();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi! I'm DC Gemini AI ✦. I can answer any questions about ${member?.name || 'this member'}, their department, or Dhaanish Chennai College of Engineering IEDC.`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Auto Dismiss Mobile Splash Screen after 2.0s
  useEffect(() => {
    if (showMobileSplash) {
      const startTime = Date.now();
      const duration = 2000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.floor((elapsed / duration) * 100));
        setSplashProgress(p);

        if (elapsed >= duration) {
          clearInterval(interval);
          setShowMobileSplash(false);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [showMobileSplash]);

  // Intercept browser back button
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      setIsConfirmCloseOpen(true);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen, isTyping]);

  if (!member) {
    return (
      <div className="w-full min-h-screen bg-[#0E0D14] flex items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-[420px] bg-[#161B22] border border-slate-800 rounded-[32px] p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">
              Profile Not Found
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              No volunteer profile is selected or available in the database.
            </p>
          </div>
          <a
            href="/?view=staff"
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors block"
          >
            Return to Staff Portal
          </a>
        </div>
      </div>
    );
  }

  // STAFF DENIED ACCESS SCREEN
  if (member.status === 'DENIED') {
    return (
      <div className="w-full min-h-screen bg-[#0E0D14] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-[36px] p-8 text-center space-y-6 shadow-2xl border-4 border-red-500 font-sans">
          <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-widest block">
              🛑 QR CODE DISABLED / ACCESS DENIED
            </span>
            <h2 className="text-2xl font-black text-[#15141B] uppercase pt-2">{member.name}</h2>
            <p className="text-xs font-mono text-gray-500 font-bold">ID: {member.id} • {member.department}</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-left text-xs space-y-2 text-red-900 font-semibold leading-relaxed">
            <p className="font-black text-red-700 uppercase tracking-wide flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-red-600" />
              Volunteer Access Status Revoked:
            </p>
            <p>
              Your active volunteer position status and QR Code have been <strong>DISABLED</strong> by the Staff Coordinator due to a reported misuse or policy violation.
            </p>
            <p className="font-bold pt-1 text-red-800 border-t border-red-200/80">
              ✦ Please meet Mam / Administration to discuss the issue and restore your active status.
            </p>
          </div>

          <button
            onClick={() => {
              if (onClose) onClose();
              else window.history.back();
            }}
            className="w-full py-4 rounded-2xl bg-[#15141B] text-white font-black text-sm uppercase shadow-md cursor-pointer hover:bg-black transition-colors"
          >
            Close Screen
          </button>
        </div>
      </div>
    );
  }

  const nameParts = (member.name || 'MEMBER NAME').split(' ');
  const firstName = nameParts[0] || 'KARIMULLA';
  const lastName = nameParts.slice(1).join(' ') || 'SK';
  const cleanPhoneDigits = (member.phone || '').replace(/[^0-9]/g, '');

  // Download Contact vCard File (.vcf)
  const handleDownloadVcf = () => {
    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${member.name}`,
      `ORG:Dhaanish Chennai College of Engineering - IEDC`,
      `TITLE:${member.roleTitle || 'Executive Lead'}`,
      member.phone ? `TEL;TYPE=CELL:${member.phone}` : '',
      member.email ? `EMAIL:${member.email}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vcf], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${firstName}_${lastName || 'Profile'}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download High Quality Front ID Card Image (PNG) with Dynamic Active Event Name & HD Cutout Photo
  const handleDownloadFrontID = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    const drawCard = (imgObj = null) => {
      // Background
      ctx.fillStyle = '#08090C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Punch slot
      ctx.fillStyle = '#000000';
      ctx.fillRect(260, 20, 80, 16);

      // Top Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 28px sans-serif';
      ctx.fillText('AURIX', 40, 75);

      // Dynamic Top Right Active Event Name
      const cardFestTitle = activeEvt ? activeEvt.title : 'AURIX 2026 ANNUAL TECHNICAL FEST';
      ctx.fillStyle = '#38BDF8';
      ctx.font = '800 16px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(cardFestTitle.substring(0, 28), 560, 75);
      ctx.textAlign = 'left';

      // LEAD Watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.font = '900 180px sans-serif';
      ctx.fillText('L E A D', 20, 480);

      // Draw Cutout Photo if available
      if (imgObj) {
        ctx.drawImage(imgObj, 100, 150, 400, 560);
      }

      // Base Dark Gradient Fade Overlay
      const grad = ctx.createLinearGradient(0, 550, 0, 960);
      grad.addColorStop(0, 'rgba(8,9,12,0)');
      grad.addColorStop(0.7, 'rgba(8,9,12,0.92)');
      grad.addColorStop(1, '#08090C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 550, 600, 410);

      // Volunteer Details Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 42px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(member.name.toUpperCase(), 300, 830);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '900 22px sans-serif';
      ctx.fillText((member.roleTitle || member.team || 'EXECUTIVE LEAD').toUpperCase(), 300, 875);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '700 18px monospace';
      ctx.fillText(`${member.batch || '2 0 2 4 - 2 0 2 8'} • ID: ${member.id}`, 300, 915);

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${member.name.replace(/\s+/g, '_')}_Front_ID_Card.png`;
      a.click();
    };

    const targetUrl = displayCutoutUrl || (member.id === 'DC0001' ? '/karimulla_cutout.png' : null);

    if (targetUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => drawCard(img);
      img.onerror = () => drawCard(null);
      img.src = targetUrl;
    } else {
      drawCard(null);
    }
  };

  // Download High Quality Back ID Card Image (PNG) with Scannable QR Code
  const handleDownloadBackID = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    const profileUrl = member.profileUrl || `https://aurix-dun.vercel.app/profile/${member.id}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(profileUrl)}`;

    const drawBackCard = (qrImg = null) => {
      // Background
      ctx.fillStyle = '#08090C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Punch slot
      ctx.fillStyle = '#000000';
      ctx.fillRect(260, 20, 80, 16);

      // Top Header
      ctx.fillStyle = '#1D2B68';
      ctx.fillRect(40, 80, 520, 8);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DHAANISH CHENNAI COLLEGE OF ENGINEERING', 300, 140);

      // QR Box Container
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(160, 240, 280, 280);

      if (qrImg) {
        ctx.drawImage(qrImg, 175, 255, 250, 250);
      } else {
        ctx.fillStyle = '#000000';
        ctx.font = '900 32px monospace';
        ctx.fillText('DC QR', 300, 380);
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 22px sans-serif';
      ctx.fillText(`DEPARTMENT OF ${(member.department || 'CSE').toUpperCase()}`, 300, 600);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '700 20px monospace';
      ctx.fillText(member.phone || '+91 9000 00 0000', 300, 650);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '700 16px monospace';
      ctx.fillText('aurix-dun.vercel.app', 300, 695);

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${member.name.replace(/\s+/g, '_')}_Back_ID_Card.png`;
      a.click();
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawBackCard(img);
    img.onerror = () => drawBackCard(null);
    img.src = qrApiUrl;
  };

  // Natural Language AI Conversational Engine
  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    const name = member.name || 'Member';
    const role = member.roleTitle || member.team || 'Executive Lead';
    const dept = member.department || 'Computer Science & Engineering';

    if (query.includes('who') || query.includes('name') || query.includes('about')) {
      return `${name} is an active student coordinator at Dhaanish Chennai College of Engineering, serving in the ${role} (${dept}, Batch ${member.batch || '2024-2028'}, ID: ${member.id}).`;
    }

    if (query.includes('role') || query.includes('position') || query.includes('lead') || query.includes('work')) {
      return `As part of ${role}, ${name} coordinates event operations and student initiatives under Dhaanish Chennai College IEDC.`;
    }

    if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('number') || query.includes('whatsapp')) {
      return `You can reach ${name} directly via Phone/WhatsApp at ${member.phone || '+91 9000 00 0000'} or Email at ${member.email || 'student@dhaanish.edu'}.`;
    }

    return `Thank you for asking! ${name} is a verified ${role} at Dhaanish Chennai College of Engineering. For direct inquiries, feel free to call or WhatsApp ${name} at ${member.phone || '+91 9000 00 0000'}.`;
  };

  const handleSendMessage = (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = generateAIResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: aiReplyText }
      ]);
      setIsTyping(false);
    }, 750);
  };

  const rawCutout = member.heroCutout || member.avatar || member.profile_image_url || (member.id === 'DC0001' ? '/karimulla_cutout.png' : null);
  const displayCutoutUrl = (rawCutout && typeof rawCutout === 'string') ? rawCutout : (member.id === 'DC0001' ? '/karimulla_cutout.png' : null);

  const suggestionChips = [
    `Who is ${firstName}?`,
    `Contact ${firstName}`,
    `Role & Department`,
    `Dhaanish IEDC`
  ];

  const languagesList = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0E0D14] flex items-center justify-center p-0 sm:py-6 sm:px-4 font-sans antialiased relative">
      
      {/* PHONE WEBPAGE CONTAINER SHELL */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:h-[860px] bg-[#F5F2FB] sm:rounded-[42px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] sm:border-[8px] sm:border-[#1F1E2A] overflow-y-auto relative text-[#15141B] font-sans antialiased no-scrollbar">

        {/* CRISP, PROPORTIONAL MOBILE SPLASH OVERLAY */}
        <AnimatePresence>
          {showMobileSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={() => setShowMobileSplash(false)}
              className="absolute inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
            >
              {/* Skip Button Top Right */}
              <div className="absolute top-6 right-6 z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMobileSplash(false);
                  }}
                  className="text-[11px] font-mono tracking-widest text-gray-300 hover:text-white uppercase transition-colors px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
                >
                  SKIP ↗
                </button>
              </div>

              {/* PERFECTLY SIZED CRISP SPLASH IMAGE SHOWCASE */}
              <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
                <motion.img
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  src="/aurix_splash.png"
                  alt="AURIX Mobile Splash Screen"
                  className="max-w-[390px] max-h-[80vh] w-auto h-auto object-contain filter drop-shadow-[0_10px_30px_rgba(42,59,255,0.4)]"
                />
              </div>

              {/* Bottom Progress Bar Indicator */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-40 flex flex-col items-center gap-1.5 z-30 pointer-events-none">
                <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#2A3BFF] via-[#38BDF8] to-white rounded-full shadow-[0_0_8px_#38BDF8]"
                    style={{ width: `${splashProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inner Phone Webpage Content Layout */}
        <div className="w-full min-h-full pt-8 sm:pt-9 pb-12 px-6 sm:px-7 relative flex flex-col justify-between">
          
          <div>
            {/* Header with Back Navigation Arrow */}
            <header className="flex items-center justify-between pb-2">
              <button
                onClick={() => setShowMobileSplash(true)}
                className="w-[42px] h-[42px] rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#15141B] transition-colors cursor-pointer"
                aria-label="Show Splash Screen"
                title="Show Splash Screen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* SWAPPED: DC Shield Logo FIRST, then AURIX Title */}
              <div className="flex items-center gap-2.5">
                <img
                  src="/dc_shield_logo.png"
                  alt="DC Shield Logo"
                  className="h-[34px] w-auto object-contain block"
                />
                <span className="font-sans font-black text-[22px] tracking-[0.16em] text-[#1D2B68] uppercase">
                  AURIX
                </span>
              </div>
            </header>

            {/* Hero Section */}
            <section className="pt-7 sm:pt-8">
              <p className="font-black text-[13px] sm:text-[14px] tracking-[0.24em] uppercase text-[#33303E] mb-2.5 font-sans">
                {t.executiveLead}
              </p>

              <h1 className="font-black text-[48px] sm:text-[52px] leading-[0.94] tracking-[-0.02em] uppercase font-sans text-[#15141B]">
                {firstName}
                <br />
                {lastName}
              </h1>

              {/* DIRECT CUTOUT PHOTO FRAME (NO BACKGROUND CARD BOX) WITH BOTTOM DARK FADE GRADIENT */}
              <div className="mt-6 flex justify-center relative">
                <div className="w-full max-w-[320px] h-[350px] flex items-end justify-center relative overflow-hidden">
                  {displayCutoutUrl ? (
                    <>
                      <img
                        src={displayCutoutUrl}
                        alt={member.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.15)] relative z-10"
                      />
                      {/* Subtle Bottom Dark Fade Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F5F2FB] via-[#F5F2FB]/80 to-transparent z-20 pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-[200px] h-[260px] bg-[#ECE7F9]/50 rounded-3xl flex items-center justify-center border border-purple-200/50">
                      <svg className="w-[78%] h-auto block" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="86" r="52" fill="#C9C1EA" />
                        <path d="M20 240c0-55 36-96 80-96s80 41 80 96" fill="#C9C1EA" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ACTIVE EVENT WORK TASK BANNER (VISIBLE ONLY TO VOLUNTEER WHILE EVENT IS RUNNING) */}
            {activeAssignment && (
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-5 rounded-2xl bg-white text-slate-900 space-y-3.5 shadow-md border border-slate-200/90 font-sans relative overflow-hidden text-left"
              >
                {/* Top professional gradient stroke */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase tracking-wider border border-emerald-200/80 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACTIVE EVENT TASK
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    {activeAssignment.event.startTime} - {activeAssignment.event.endTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight leading-snug">
                    {activeAssignment.event.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{activeAssignment.event.venue}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>ASSIGNED WORK</span>
                    </span>
                    <span className="text-[11px] text-blue-700 font-extrabold font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">
                      {activeAssignment.assignedTeam}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 font-semibold leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    "{activeAssignment.task}"
                  </div>
                </div>
              </motion.section>
            )}

            {/* Role Section */}
            <section className="mt-8 pt-2">
              <h2 className="font-black text-[34px] sm:text-[36px] text-[#2A3BFF] tracking-[-0.02em] leading-tight font-sans uppercase">
                {lang === 'en' ? (member.roleTitle || member.team || t.mediaLead) : t.mediaLead}
              </h2>

              <div className="font-extrabold text-[18px] text-[#4A4754] tracking-[0.08em] uppercase mt-2 font-sans">
                {lang === 'en' ? (member.department || t.computerScience) : t.computerScience}
              </div>

              <div className="text-[14px] text-[#6B687B] mt-2.5 font-bold uppercase font-sans tracking-[0.14em]">
                {member.batch || '2 0 2 4 - 2 0 2 8'}
              </div>
            </section>

            {/* Links Navigation Section */}
            <nav className="mt-10 sm:mt-12 space-y-3.5">

              <a
                href={`tel:${member.phone}`}
                className="flex items-center justify-between py-3.5 px-1 text-[#15141B] hover:text-[#2A3BFF] transition-colors group text-decoration-none"
              >
                <span className="font-sans font-black text-[20px] sm:text-[21px] tracking-[0.06em] uppercase text-[#15141B]">{t.phone}</span>
                <svg className="w-6 h-6 text-[#15141B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={`https://wa.me/${cleanPhoneDigits || '919074389868'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 px-1 text-[#15141B] hover:text-[#2A3BFF] transition-colors group text-decoration-none"
              >
                <span className="font-sans font-black text-[20px] sm:text-[21px] tracking-[0.06em] uppercase text-[#15141B]">{t.whatsapp}</span>
                <svg className="w-6 h-6 text-[#15141B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={`mailto:${member.email}`}
                className="flex items-center justify-between py-3.5 px-1 text-[#15141B] hover:text-[#2A3BFF] transition-colors group text-decoration-none"
              >
                <span className="font-sans font-black text-[20px] sm:text-[21px] tracking-[0.06em] uppercase text-[#15141B]">{t.email}</span>
                <svg className="w-6 h-6 text-[#15141B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={`https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 px-1 text-[#15141B] hover:text-[#2A3BFF] transition-colors group text-decoration-none"
              >
                <span className="font-sans font-black text-[20px] sm:text-[21px] tracking-[0.06em] uppercase text-[#15141B]">{t.linkedin}</span>
                <svg className="w-6 h-6 text-[#15141B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 px-1 text-[#15141B] hover:text-[#2A3BFF] transition-colors group text-decoration-none"
              >
                <span className="font-sans font-black text-[20px] sm:text-[21px] tracking-[0.06em] uppercase text-[#15141B]">{t.instagram}</span>
                <svg className="w-6 h-6 text-[#15141B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

            </nav>

            {/* 1-INCH GAP & ACTION BUTTONS BAR */}
            <div className="mt-12 sm:mt-14 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-br from-[#15141B] to-[#3A3845] text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10 group"
              >
                <Settings className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-sans font-black text-xs tracking-wider uppercase text-white">
                  {t.settingsBtn}
                </span>
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-br from-[#2A3BFF] via-[#1E2BBE] to-[#15141B] text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer relative border border-white/10 group"
              >
                <Sparkles className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
                <span className="font-sans font-black text-xs tracking-wider uppercase text-white">
                  {t.geminiBtn}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-white" />
              </button>
            </div>
          </div>

          {/* FOOTER SECTION BELOW THE ACTION BUTTONS */}
          <footer className="mt-10 pt-6 border-t border-[#E4E0EE] text-center font-sans">
            <p className="text-[12px] font-black text-[#15141B] tracking-[0.14em] uppercase">
              © 2026 AURIX
            </p>
            <p className="text-[11px] font-bold text-[#6B687B] mt-1 tracking-wider">
              Built by KM Labs
            </p>
          </footer>

        </div>

      </div>

      {/* CONFIRM CLOSE MODAL */}
      <AnimatePresence>
        {isConfirmCloseOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 w-full max-w-[340px] text-center font-sans shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto font-black text-lg">
                ?
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#15141B]">{t.confirmCloseTitle}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{t.confirmCloseMessage}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsConfirmCloseOpen(false);
                    if (onClose) onClose();
                    else window.history.back();
                  }}
                  className="w-full py-3 rounded-xl bg-[#15141B] hover:bg-black text-white font-bold text-xs cursor-pointer shadow transition-colors"
                >
                  {t.yes}
                </button>

                <button
                  onClick={() => setIsConfirmCloseOpen(false)}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#15141B] font-bold text-xs cursor-pointer transition-colors"
                >
                  {t.no}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SETTINGS & LANGUAGE MODAL */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div
            onClick={() => setIsSettingsOpen(false)}
            className="fixed inset-0 bg-[#14121E]/50 z-40 flex items-end sm:items-center justify-center backdrop-blur-xs"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[430px] rounded-t-[26px] sm:rounded-[26px] p-6 font-sans shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#2A3BFF]" />
                  <h3 className="font-black text-[18px] text-[#15141B]">{t.settingsTitle}</h3>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1 text-gray-400 hover:text-[#15141B] rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#8C899A] flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#2A3BFF]" />
                  {t.selectLanguage}
                </label>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {languagesList.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => setLang(item.code)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        lang === item.code
                          ? 'border-[#2A3BFF] bg-[#2A3BFF]/5 text-[#2A3BFF] font-black shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 text-[#15141B] font-bold'
                      }`}
                    >
                      <div>
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[11px] opacity-75 font-serif">{item.native}</div>
                      </div>
                      {lang === item.code && <Check className="w-4 h-4 text-[#2A3BFF]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download ID Card & Splash Replay Section */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <label className="text-xs font-black uppercase tracking-wider text-[#8C899A] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#2A3BFF]" />
                  {t.downloadSection}
                </label>

                <div className="space-y-2">
                  <button
                    onClick={handleDownloadFrontID}
                    className="w-full py-3 px-4 rounded-xl bg-[#15141B] hover:bg-black text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{t.downloadFront}</span>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={handleDownloadBackID}
                    className="w-full py-3 px-4 rounded-xl bg-[#15141B] hover:bg-black text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{t.downloadBack}</span>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={handleDownloadVcf}
                    className="w-full py-3 px-4 rounded-xl bg-[#2A3BFF] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{t.downloadVcf}</span>
                    <Download className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => {
                      setIsSettingsOpen(false);
                      setShowMobileSplash(true);
                      if (onReplaySplash) onReplaySplash();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#030308] border border-blue-500/30 hover:border-blue-500 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="text-[#38BDF8]">{t.replaySplash}</span>
                    <Play className="w-4 h-4 text-[#38BDF8]" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-3 bg-gray-100 text-[#8C899A] hover:text-[#15141B] font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                {t.close}
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GEMINI / CHATGPT STYLE REAL CONVERSATIONAL AI CHAT MODAL */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed sm:absolute bottom-24 right-4 sm:right-6 w-[90%] max-w-[380px] bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col h-[450px]"
          >
            <div className="p-3.5 bg-gradient-to-r from-[#15141B] via-[#1E2BBE] to-[#2A3BFF] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white font-sans flex items-center gap-1.5">
                    DC Gemini AI ✦
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-300 font-sans">Official Conversational Bot</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-[#F8F6FD]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-[#2A3BFF] text-white font-medium rounded-br-xs shadow-sm'
                        : 'bg-white text-[#15141B] border border-[#E4E0EE] shadow-sm rounded-bl-xs leading-relaxed font-sans'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E4E0EE] text-gray-500 p-3 rounded-2xl rounded-bl-xs shadow-sm flex items-center gap-1.5 text-xs font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-[#2A3BFF] animate-spin" />
                    <span>Gemini AI is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="px-3 py-1.5 bg-[#F8F6FD] border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(null, chip)}
                  className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[10.5px] font-bold text-[#2A3BFF] shrink-0 hover:bg-[#2A3BFF] hover:text-white transition-colors shadow-xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2.5 border-t border-gray-200 bg-white flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Gemini AI anything..."
                className="flex-1 bg-gray-100 text-[#15141B] text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A3BFF] font-sans"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-3.5 py-2.5 bg-[#2A3BFF] disabled:bg-gray-300 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
