import express from 'express';
import {
  Student,
  Faculty,
  Hod,
  Mentor,
  Timetable,
  Attendance,
  LeaveApplication,
  MentorAlert,
  CallLog
} from './models.js';

export const router = express.Router();

const stripPassword = (obj: any) => {
  if (!obj) return obj;
  const data = obj.toObject ? obj.toObject() : obj;
  delete data.password;
  delete data.__v;
  return data;
};

router.post('/auth/login', async (req, res) => {
  try {
    const { emailOrRoll, password } = req.body;
    if (!emailOrRoll || !password) return res.status(400).json({ error: 'Missing credentials' });

    const faculty = await Faculty.findOne({ email: emailOrRoll, password });
    if (faculty && faculty.isActive) return res.json({ user: stripPassword(faculty), role: 'FACULTY' });

    const hod = await Hod.findOne({ email: emailOrRoll, password });
    if (hod && hod.isActive) return res.json({ user: stripPassword(hod), role: 'HOD' });

    const mentor = await Mentor.findOne({ email: emailOrRoll, password });
    if (mentor && mentor.isActive) return res.json({ user: stripPassword(mentor), role: 'MENTOR' });

    const student = await Student.findOne({ rollNo: emailOrRoll, password });
    if (student) return res.json({ user: stripPassword(student), role: 'STUDENT' });

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const createCrud = (path: string, Model: any) => {
  router.get(`/${path}`, async (_req, res) => {
    try {
      const items = await Model.find();
      res.json(items.map(stripPassword));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post(`/${path}`, async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(stripPassword(item));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

createCrud('students', Student);
createCrud('faculty', Faculty);
createCrud('hods', Hod);
createCrud('mentors', Mentor);
createCrud('attendance', Attendance);
createCrud('alerts', MentorAlert);
createCrud('call-logs', CallLog);

router.get('/timetable', async (_req, res) => {
  try {
    const entries = await Timetable.find();
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/timetable', async (req, res) => {
  try {
    const entry = new Timetable(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/leaves', async (_req, res) => {
  try {
    const leaves = await LeaveApplication.find();
    res.json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/leaves', async (req, res) => {
  try {
    const leave = new LeaveApplication(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/leaves/:id', async (req, res) => {
  try {
    const updated = await LeaveApplication.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Leave not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/alerts/:id', async (req, res) => {
  try {
    const updated = await MentorAlert.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Alert not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
