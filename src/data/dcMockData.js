// Dhaanish Chennai College of Engineering (DCE) - Ecosystem Initial Data

export const OFFICIAL_AURIX_TEAMS = [
  'ALL',
  'Media Team',
  'Marketing Team',
  'Hospitality Team',
  'Registration Team',
  'Technical Team',
  'Stage Management Team',
  'Discipline & Bouncers Team',
  'Content & Documentation Team',
  'Protocol Team',
  'Volunteer Coordination Team',
  'Website & Digital Team'
];

export const DEFAULT_DEPARTMENTS = [
  { id: 'dept-cse', code: 'CSE', name: 'CSE - Computer Science & Engineering' },
  { id: 'dept-ece', code: 'ECE', name: 'ECE - Electronics & Communication Eng.' },
  { id: 'dept-eee', code: 'EEE', name: 'EEE - Electrical & Electronics Eng.' },
  { id: 'dept-mech', code: 'MECH', name: 'MECH - Mechanical Engineering' },
  { id: 'dept-mechatronics', code: 'MECHATRONICS', name: 'MECHATRONICS - Mechatronics Engineering' },
  { id: 'dept-aids', code: 'AI&DS', name: 'AI&DS - Artificial Intelligence & Data Science' },
  { id: 'dept-aiml', code: 'AI&ML', name: 'AI&ML - Artificial Intelligence & Machine Learning' },
  { id: 'dept-mba', code: 'MBA', name: 'MBA - Master of Business Administration' },
  { id: 'dept-csbs', code: 'CSBS', name: 'CSBS - Computer Science & Business Systems' },
  { id: 'dept-robotics', code: 'ROBOTICS', name: 'ROBOTICS - Robotics & Automation' }
];

export const DEFAULT_TEAMS = [
  { id: 'team-media', code: 'MEDIA', name: 'Media Team' },
  { id: 'team-mkt', code: 'MARKETING', name: 'Marketing Team' },
  { id: 'team-hosp', code: 'HOSPITALITY', name: 'Hospitality Team' },
  { id: 'team-reg', code: 'REGISTRATION', name: 'Registration Team' },
  { id: 'team-tech', code: 'TECHNICAL', name: 'Technical Team' },
  { id: 'team-stage', code: 'STAGE', name: 'Stage Management Team' },
  { id: 'team-disc', code: 'BOUNCERS', name: 'Discipline & Bouncers Team' },
  { id: 'team-doc', code: 'CONTENT', name: 'Content & Documentation Team' },
  { id: 'team-proto', code: 'PROTOCOL', name: 'Protocol Team' },
  { id: 'team-vol', code: 'VOLUNTEER', name: 'Volunteer Coordination Team' },
  { id: 'team-web', code: 'WEBSITE', name: 'Website & Digital Team' }
];

// Default High-Res Cutout Silhouette SVG Data URL for Initial Members
const DEFAULT_STUDIO_CUTOUT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" width="320" height="400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231D2B68"/><stop offset="100%" stop-color="%230F172A"/></linearGradient><linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%2338BDF8"/><stop offset="100%" stop-color="%232A3BFF"/></linearGradient></defs><rect width="320" height="400" rx="32" fill="url(%23bg)"/><circle cx="160" cy="140" r="70" fill="url(%23glow)" opacity="0.9" stroke="%23FFFFFF" stroke-width="4"/><path d="M50 360 C50 250 270 250 270 360 Z" fill="url(%23glow)" opacity="0.9" stroke="%23FFFFFF" stroke-width="4"/><text x="160" y="150" font-family="sans-serif" font-weight="900" font-size="32" fill="%23FFFFFF" text-anchor="middle">KM</text><text x="160" y="380" font-family="sans-serif" font-weight="800" font-size="16" fill="%2338BDF8" text-anchor="middle">AURIX VOLUNTEER</text></svg>`;

// INITIAL MEMBERS DEFAULT REGISTRATION
export const INITIAL_DC_MEMBERS = [
  {
    id: 'DC0001',
    volunteer_id: 'DC0001',
    profileUrl: 'https://aurix-dun.vercel.app/profile/DC0001',
    token: 'TOKEN-DC0001-AURIX-2026',
    registerNo: '310624104103',
    name: 'KARIMULLA SK',
    full_name: 'KARIMULLA SK',
    roleTitle: 'EXECUTIVE LEAD',
    department: 'CSE - COMPUTER SCIENCE & ENGINEERING',
    batch: '2 0 2 4 - 2 0 2 8',
    joinYear: '2024',
    passoutYear: '2028',
    year: '3rd Year',
    phone: '+91 9000 00 0000',
    email: 'karimulla@dhaanish.edu',
    team: 'Media Team',
    userType: 'EXECUTIVE LEAD',
    about: 'Dhaanish Chennai College Event Operations Team Member.',
    avatar: DEFAULT_STUDIO_CUTOUT,
    heroCutout: DEFAULT_STUDIO_CUTOUT,
    profile_image_url: DEFAULT_STUDIO_CUTOUT,
    status: 'ACTIVE'
  }
];

export const INITIAL_DC_EVENTS = [
  {
    id: 'ev-1',
    code: 'AURIX-2026',
    title: 'AURIX 2026 Annual Technical Fest',
    date: '2026-08-15',
    venue: 'Main Auditorium, DCE Campus',
    totalCheckIns: 412,
    capacity: 600
  }
];
