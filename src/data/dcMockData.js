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

// INITIAL MEMBERS START FRESH (ADDED BY STAFF COORDINATOR ON REGISTRATION)
export const INITIAL_DC_MEMBERS = [];

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
