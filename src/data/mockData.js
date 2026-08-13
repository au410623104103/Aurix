// EVENTOPS - Comprehensive Mock Data Store

export const INITIAL_EVENTS = [
  {
    id: 'evt-2026-techfest',
    name: 'TECHFEST 2026',
    code: 'TF26',
    category: 'National Technology & Innovation Summit',
    startDate: '2026-08-12T09:00:00',
    endDate: '2026-08-14T17:00:00',
    location: 'Main Campus Auditorium & Tech Block',
    status: 'ACTIVE',
    totalMembers: 102,
    checkedInMembers: 87,
    facultyLead: 'Prof. Ananya Roy',
    overallCoordinator: 'Syed Muaz',
    description: 'Annual technical fest showcasing robotics, hackathons, AI expos, and keynote sessions.',
  },
  {
    id: 'evt-2026-cultura',
    name: 'CULTURA 2026',
    code: 'CL26',
    category: 'Inter-College Cultural Festival',
    startDate: '2026-09-05T10:00:00',
    endDate: '2026-09-07T22:00:00',
    location: 'Open Air Amphitheatre',
    status: 'UPCOMING',
    totalMembers: 80,
    checkedInMembers: 0,
    facultyLead: 'Dr. Vikram Malhotra',
    overallCoordinator: 'Sarah Jenkins',
    description: 'Cultural extravaganza featuring music, dance, drama, and fine arts competitions.',
  }
];

export const ROLE_DEFINITIONS = {
  ADMIN: {
    key: 'ADMIN',
    name: 'System Admin',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    level: 1,
    description: 'Full system control, user generation, global permissions & event management.'
  },
  FACULTY_COORDINATOR: {
    key: 'FACULTY_COORDINATOR',
    name: 'Faculty Coordinator',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    level: 2,
    description: 'Faculty oversight, high-level reporting, official announcements & security supervision.'
  },
  EVENT_COORDINATOR: {
    key: 'EVENT_COORDINATOR',
    name: 'Event Coordinator',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    level: 3,
    description: 'Overall event logistics, department head management, task assignment & QR verification.'
  },
  EVENT_HEAD: {
    key: 'EVENT_HEAD',
    name: 'Event Head',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    level: 4,
    description: 'Departmental leadership, volunteer management, task tracking & operational QR scanning.'
  },
  VOLUNTEER: {
    key: 'VOLUNTEER',
    name: 'Volunteer',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    level: 5,
    description: 'Ground execution, assigned task updates, peer identity verification & issue reporting.'
  }
};

export const INITIAL_USERS = [
  {
    id: 'usr-001',
    token: 'EVT26-TEAM-8F39A2',
    name: 'Anshif',
    email: 'anshif.media@college.edu',
    password: 'password123',
    role: 'EVENT_HEAD',
    roleTitle: 'MEDIA & MARKETING LEAD',
    department: 'Computer Science',
    team: 'Media & Communications',
    batch: '2024-2028',
    phone: '+91 9074 38 9868',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/anshif-media',
    instagram: 'https://instagram.com/anshif_iedc',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T08:30:00',
    assignedTasksCount: 5,
    completedTasksCount: 4,
    qrRegeneratedCount: 0
  },
  {
    id: 'usr-002',
    token: 'EVT26-TEAM-9C14B3',
    name: 'Syed Muaz',
    email: 'syed.muaz@college.edu',
    password: 'password123',
    role: 'EVENT_COORDINATOR',
    roleTitle: 'TECHNICAL OPERATIONS LEAD',
    department: 'Computer Science',
    team: 'Technical Operations',
    batch: '2023-2027',
    phone: '+91 9845 12 3456',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/syed-muaz',
    instagram: 'https://instagram.com/syed_muaz_tech',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T08:15:00',
    assignedTasksCount: 8,
    completedTasksCount: 6,
    qrRegeneratedCount: 1
  },
  {
    id: 'usr-003',
    token: 'EVT26-TEAM-1A77E4',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@college.edu',
    password: 'password123',
    role: 'ADMIN',
    roleTitle: 'CHIEF CONVENER & ADMIN',
    department: 'Administration',
    team: 'Executive Board',
    batch: 'FACULTY',
    phone: '+91 9811 00 1122',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/dr-rajesh-sharma',
    instagram: 'https://instagram.com/rajesh_sharma',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T07:45:00',
    assignedTasksCount: 12,
    completedTasksCount: 10,
    qrRegeneratedCount: 0
  },
  {
    id: 'usr-004',
    token: 'EVT26-TEAM-4D88F9',
    name: 'Prof. Ananya Roy',
    email: 'ananya.roy@college.edu',
    password: 'password123',
    role: 'FACULTY_COORDINATOR',
    roleTitle: 'FACULTY ADVISOR - TECH FEST',
    department: 'Electronics & Comm.',
    team: 'Faculty Oversight',
    batch: 'FACULTY',
    phone: '+91 9722 33 4455',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/prof-ananya-roy',
    instagram: 'https://instagram.com/ananya_roy_edu',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T08:00:00',
    assignedTasksCount: 4,
    completedTasksCount: 4,
    qrRegeneratedCount: 0
  },
  {
    id: 'usr-005',
    token: 'EVT26-TEAM-7B22C1',
    name: 'Rahul Varma',
    email: 'rahul.varma@college.edu',
    password: 'password123',
    role: 'VOLUNTEER',
    roleTitle: 'STAGE OPERATIONS VOLUNTEER',
    department: 'Mechanical Engineering',
    team: 'Stage & Sound',
    batch: '2025-2029',
    phone: '+91 9899 44 5566',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/rahul-varma',
    instagram: 'https://instagram.com/rahul_v',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T08:40:00',
    assignedTasksCount: 3,
    completedTasksCount: 2,
    qrRegeneratedCount: 0
  },
  {
    id: 'usr-006',
    token: 'EVT26-TEAM-3E55A9',
    name: 'Priyesha Das',
    email: 'priyesha.das@college.edu',
    password: 'password123',
    role: 'VOLUNTEER',
    roleTitle: 'HOSPITALITY VOLUNTEER',
    department: 'Information Technology',
    team: 'Guest Relations',
    batch: '2024-2028',
    phone: '+91 9123 45 6789',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/priyesha-das',
    instagram: 'https://instagram.com/priyesha_d',
    eventId: 'evt-2026-techfest',
    isCheckedIn: false,
    checkInTime: null,
    assignedTasksCount: 4,
    completedTasksCount: 1,
    qrRegeneratedCount: 0
  },
  {
    id: 'usr-007',
    token: 'EVT26-TEAM-6C99D2',
    name: 'Kevin Patel',
    email: 'kevin.patel@college.edu',
    password: 'password123',
    role: 'EVENT_HEAD',
    roleTitle: 'STAGE & SOUND HEAD',
    department: 'Electrical Engineering',
    team: 'Stage & Sound',
    batch: '2023-2027',
    phone: '+91 9876 54 3210',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    heroAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com/in/kevin-patel',
    instagram: 'https://instagram.com/kevin_patel_sound',
    eventId: 'evt-2026-techfest',
    isCheckedIn: true,
    checkInTime: '2026-08-12T08:10:00',
    assignedTasksCount: 6,
    completedTasksCount: 5,
    qrRegeneratedCount: 0
  }
];

export const INITIAL_TASKS = [
  {
    id: 'tsk-101',
    title: 'Setup Main Stage Audio & Visual Mic Array',
    description: 'Ensure wireless lapels and podium microphones are calibrated for Chief Guest inauguration.',
    department: 'Stage & Sound',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    assignedTo: 'Rahul Varma',
    assignedToId: 'usr-005',
    createdBy: 'Kevin Patel',
    deadline: '2026-08-12T09:30:00',
    eventId: 'evt-2026-techfest'
  },
  {
    id: 'tsk-102',
    title: 'Install QR Scan Stations at Entrance Gates',
    description: 'Verify power outlets and backup iPad scanners for volunteer identity checks.',
    department: 'Technical Operations',
    priority: 'HIGH',
    status: 'COMPLETED',
    assignedTo: 'Syed Muaz',
    assignedToId: 'usr-002',
    createdBy: 'Dr. Rajesh Sharma',
    deadline: '2026-08-12T08:30:00',
    eventId: 'evt-2026-techfest'
  },
  {
    id: 'tsk-103',
    title: 'Media Press Kit & Instagram Reel Uploads',
    description: 'Capture inauguration photos, edit 30s teaser reel, and post to official college handle.',
    department: 'Media & Communications',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedTo: 'Anshif',
    assignedToId: 'usr-001',
    createdBy: 'Prof. Ananya Roy',
    deadline: '2026-08-12T11:00:00',
    eventId: 'evt-2026-techfest'
  },
  {
    id: 'tsk-104',
    title: 'VVIP Guest Lounge Refreshments Setup',
    description: 'Arrange welcome drinks, badges, and schedule handouts for keynote speakers.',
    department: 'Guest Relations',
    priority: 'HIGH',
    status: 'PENDING',
    assignedTo: 'Priyesha Das',
    assignedToId: 'usr-006',
    createdBy: 'Prof. Ananya Roy',
    deadline: '2026-08-12T10:15:00',
    eventId: 'evt-2026-techfest'
  },
  {
    id: 'tsk-105',
    title: 'Emergency Medical Desk & First Aid Patrol',
    description: 'Station 2 red cross volunteers near the main block hall with emergency kit.',
    department: 'Security & Medical',
    priority: 'HIGH',
    status: 'COMPLETED',
    assignedTo: 'Dr. Rajesh Sharma',
    assignedToId: 'usr-003',
    createdBy: 'Dr. Rajesh Sharma',
    deadline: '2026-08-12T08:00:00',
    eventId: 'evt-2026-techfest'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'anc-01',
    title: '🚨 Chief Guest Arrival Moved to 09:45 AM',
    content: 'All Hospitality and Security heads are requested to align at Gate 1 by 09:30 AM sharp with QR badges ready.',
    author: 'Prof. Ananya Roy',
    authorRole: 'Faculty Coordinator',
    timestamp: '2026-08-12T08:45:00',
    isPinned: true,
    priority: 'HIGH'
  },
  {
    id: 'anc-02',
    title: '📢 QR ID Scanner Stations Operational at Gate 1 & 2',
    content: 'Volunteers can now check-in using their digital QR IDs. Please present your badge to your department head.',
    author: 'Syed Muaz',
    authorRole: 'Event Coordinator',
    timestamp: '2026-08-12T08:20:00',
    isPinned: true,
    priority: 'NORMAL'
  },
  {
    id: 'anc-03',
    title: '🍱 Lunch Coupon Distribution for Event Staff',
    content: 'Team leads can collect physical lunch coupons for their volunteers from Room 204 starting at 12:30 PM.',
    author: 'Dr. Rajesh Sharma',
    authorRole: 'Admin',
    timestamp: '2026-08-12T07:50:00',
    isPinned: false,
    priority: 'NORMAL'
  }
];

export const INITIAL_ISSUES = [
  {
    id: 'iss-501',
    title: 'Main Stage HDMI Splitter Signal Flicker',
    description: 'The primary projector cable loses signal during video playback. Need spare HDMI cable.',
    location: 'Main Auditorium Stage',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    reportedBy: 'Rahul Varma',
    reportedById: 'usr-005',
    assignedTo: 'Kevin Patel',
    timestamp: '2026-08-12T09:10:00'
  },
  {
    id: 'iss-502',
    title: 'Extra Power Extension Needed at Registration Desk 3',
    description: 'Laptops for badge scanning running low on battery. Need a 4-socket spike guard.',
    location: 'Gate 2 Registration Desk',
    severity: 'MEDIUM',
    status: 'OPEN',
    reportedBy: 'Priyesha Das',
    reportedById: 'usr-006',
    assignedTo: 'Syed Muaz',
    timestamp: '2026-08-12T09:22:00'
  }
];

export const EMERGENCY_CONTACTS = [
  {
    role: 'Overall Event Convener',
    name: 'Dr. Rajesh Sharma',
    phone: '+91 9811 00 1122',
    email: 'rajesh.sharma@college.edu',
    location: 'Control Room 101'
  },
  {
    role: 'Faculty Coordinator',
    name: 'Prof. Ananya Roy',
    phone: '+91 9722 33 4455',
    email: 'ananya.roy@college.edu',
    location: 'Staff Lounge B'
  },
  {
    role: 'Technical Operations Head',
    name: 'Syed Muaz',
    phone: '+91 9845 12 3456',
    email: 'syed.muaz@college.edu',
    location: 'Tech Server Booth'
  },
  {
    role: 'Campus Medical Desk',
    name: 'Dr. Sameer Khan (Infirmary)',
    phone: '+91 9900 11 2233',
    email: 'medical@college.edu',
    location: 'Health Center Ground Floor'
  },
  {
    role: 'Campus Security Control',
    name: 'Chief Security Officer Guard Desk',
    phone: '+91 9888 77 6655',
    email: 'security@college.edu',
    location: 'Main Entrance Gate'
  }
];
