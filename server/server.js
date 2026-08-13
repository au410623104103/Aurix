import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { initDb, queryDb, queryOne } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema & tables
await initDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads directory exists on disk for permanent image storage
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically at /uploads/
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.png';
    cb(null, 'volunteer-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Helper to format volunteer DB record to API format
async function formatVolunteerRecord(vol) {
  if (!vol) return null;
  
  // Get active event assignments
  const assignments = await queryDb(`
    SELECT a.*, e.event_name, e.event_date, e.event_time, e.venue, e.description
    FROM VOLUNTEER_EVENT_ASSIGNMENTS a
    JOIN EVENTS e ON a.event_id = e.id
    WHERE a.volunteer_id = ?
  `, [vol.volunteer_id]);

  // Get QR Code record
  const qrRecord = await queryOne(`
    SELECT qr_url FROM QR_CODES WHERE volunteer_id = ?
  `, [vol.volunteer_id]);

  const qrUrl = qrRecord ? qrRecord.qr_url : `https://aurix-dun.vercel.app/profile/${vol.volunteer_id}`;

  return {
    id: vol.volunteer_id,
    volunteer_id: vol.volunteer_id,
    name: vol.full_name,
    email: vol.email,
    phone: vol.phone,
    department: vol.department,
    year: vol.year,
    team: vol.team,
    roleTitle: vol.role || vol.team,
    role: vol.role || vol.team,
    profile_image_url: vol.profile_image_url,
    heroCutout: vol.profile_image_url,
    avatar: vol.profile_image_url,
    linkedin_url: vol.linkedin_url,
    instagram_url: vol.instagram_url,
    status: vol.status,
    qr_url: qrUrl,
    profileUrl: qrUrl,
    batch: vol.year ? `2 0 2 4 - 2 0 2 8` : '2 0 2 4 - 2 0 2 8',
    assignments: assignments,
    created_at: vol.created_at,
    updated_at: vol.updated_at
  };
}

// ---------------------- REST API ENDPOINTS ----------------------

// 1. GET /api/volunteers - Retrieve all volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const rows = await queryDb('SELECT * FROM VOLUNTEERS ORDER BY id DESC');
    const volunteers = await Promise.all(rows.map(formatVolunteerRecord));
    res.json(volunteers);
  } catch (err) {
    console.error('API Error /api/volunteers:', err);
    res.status(500).json({ error: 'Failed to retrieve volunteers from database' });
  }
});

// 2. GET /api/volunteers/:volunteer_id - Retrieve single volunteer (e.g. DC0001)
app.get('/api/volunteers/:volunteer_id', async (req, res) => {
  try {
    const identifier = req.params.volunteer_id.trim().toUpperCase();
    const vol = await queryOne(`
      SELECT * FROM VOLUNTEERS 
      WHERE UPPER(volunteer_id) = ? OR UPPER(email) = ? OR UPPER(phone) = ?
    `, [identifier, identifier, identifier]);

    if (!vol) {
      return res.status(404).json({ error: 'Profile Not Available. Please Contact Staff Coordinator.' });
    }

    const formatted = await formatVolunteerRecord(vol);
    res.json(formatted);
  } catch (err) {
    console.error('API Error /api/volunteers/:volunteer_id:', err);
    res.status(500).json({ error: 'Failed to retrieve profile from database' });
  }
});

// 3. POST /api/volunteers - Register new volunteer
app.post('/api/volunteers', async (req, res) => {
  try {
    const {
      full_name,
      name,
      email,
      phone,
      department,
      year,
      team,
      role,
      profile_image_url,
      linkedin_url,
      instagram_url
    } = req.body;

    const volName = full_name || name;
    if (!volName) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    // Auto-generate next unique Volunteer ID (DC0001, DC0002...)
    const lastVol = await queryOne('SELECT id FROM VOLUNTEERS ORDER BY id DESC LIMIT 1');
    const nextIdNum = lastVol ? Number(lastVol.id) + 1 : 1;
    const volunteer_id = `DC${String(nextIdNum).padStart(4, '0')}`;
    const qr_url = `https://aurix-dun.vercel.app/profile/${volunteer_id}`;

    // Insert into VOLUNTEERS table
    await queryDb(`
      INSERT INTO VOLUNTEERS (
        volunteer_id, full_name, email, phone, department, year, team, role,
        profile_image_url, linkedin_url, instagram_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')
    `, [
      volunteer_id,
      volName,
      email || `${volName.toLowerCase().replace(/\s+/g, '')}@dhaanish.edu`,
      phone || '+91 9000 00 0000',
      department || 'COMPUTER SCIENCE',
      year || '3rd Year',
      team || 'Media Team',
      role || team || 'Media Team',
      profile_image_url || null,
      linkedin_url || 'https://linkedin.com',
      instagram_url || 'https://instagram.com'
    ]);

    // Insert permanent QR Code record into QR_CODES table
    await queryDb(`
      INSERT INTO QR_CODES (volunteer_id, qr_url) VALUES (?, ?)
    `, [volunteer_id, qr_url]);

    const createdVol = await queryOne('SELECT * FROM VOLUNTEERS WHERE volunteer_id = ?', [volunteer_id]);
    console.log(`✅ Registered Volunteer ${volunteer_id} (${volName}) in Database.`);
    const formatted = await formatVolunteerRecord(createdVol);
    res.status(201).json(formatted);
  } catch (err) {
    console.error('API Error POST /api/volunteers:', err);
    res.status(500).json({ error: 'Failed to create volunteer record in database' });
  }
});

// 4. PUT /api/volunteers/:volunteer_id - Update profile image or data
app.put('/api/volunteers/:volunteer_id', async (req, res) => {
  try {
    const volId = req.params.volunteer_id.trim().toUpperCase();
    const { profile_image_url, status } = req.body;

    const vol = await queryOne('SELECT * FROM VOLUNTEERS WHERE UPPER(volunteer_id) = ?', [volId]);
    if (!vol) {
      return res.status(404).json({ error: 'Volunteer record not found' });
    }

    if (profile_image_url !== undefined) {
      await queryDb('UPDATE VOLUNTEERS SET profile_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE UPPER(volunteer_id) = ?', [profile_image_url, volId]);
    }
    if (status !== undefined) {
      await queryDb('UPDATE VOLUNTEERS SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE UPPER(volunteer_id) = ?', [status, volId]);
    }

    const updated = await queryOne('SELECT * FROM VOLUNTEERS WHERE UPPER(volunteer_id) = ?', [volId]);
    const formatted = await formatVolunteerRecord(updated);
    res.json(formatted);
  } catch (err) {
    console.error('API Error PUT /api/volunteers/:volunteer_id:', err);
    res.status(500).json({ error: 'Failed to update volunteer record' });
  }
});

// 5. POST /api/upload - Handle permanent image upload to disk storage
app.post('/api/upload', upload.single('photo'), (req, res) => {
  try {
    if (req.file) {
      const publicPath = `/uploads/${req.file.filename}`;
      return res.json({ url: publicPath, filename: req.file.filename });
    }

    // Handle base64 / Data URL upload
    if (req.body && req.body.image) {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
      const filename = 'volunteer-' + Date.now() + '.png';
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, base64Data, 'base64');
      const publicPath = `/uploads/${filename}`;
      return res.json({ url: publicPath, filename });
    }

    res.status(400).json({ error: 'No image file or base64 data provided' });
  } catch (err) {
    console.error('API Error /api/upload:', err);
    res.status(500).json({ error: 'Failed to save image to persistent storage' });
  }
});

// 6. GET /api/events - Retrieve all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await queryDb('SELECT * FROM EVENTS ORDER BY created_at DESC');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Persistent Database API Server running at http://localhost:${PORT}`);
});
