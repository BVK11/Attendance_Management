import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const studentSchema = new Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: String,
  parentContact: String,
  mentorId: String,
  department: String,
  section: String
}, { timestamps: true });

const facultySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: String,
  password: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const hodSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: String,
  password: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const mentorSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mentorId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  isActive: { type: Boolean, default: true },
  department: String
}, { timestamps: true });

const timetableSchema = new Schema({
  id: { type: String, required: true, unique: true },
  day: { type: String, required: true },
  period: { type: Number, required: true },
  subject: String,
  faculty: String,
  startTime: String,
  endTime: String,
  department: String,
  section: String
}, { timestamps: true });

const attendanceSchema = new Schema({
  date: { type: String, required: true },
  department: { type: String, required: true },
  section: { type: String, required: true },
  period: { type: Number, required: true },
  subject: String,
  facultyName: String,
  absentRollNos: { type: [String], default: [] }
}, { timestamps: true });

const leaveSchema = new Schema({
  id: { type: String, required: true, unique: true },
  rollNo: { type: String, required: true },
  studentName: String,
  startDate: String,
  endDate: String,
  reason: String,
  fileData: String,
  aiCategory: String,
  aiScore: Number,
  aiSuggestion: String,
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  appliedOn: String
}, { timestamps: true });

const alertSchema = new Schema({
  id: { type: String, required: true, unique: true },
  date: String,
  mentorId: String,
  studentName: String,
  studentRollNo: String,
  parentContact: String,
  department: String,
  section: String,
  period: Number,
  reason: String
}, { timestamps: true });

const callLogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  rollNo: String,
  date: String,
  type: { type: String, enum: ['ABSENCE', 'LOW_ATTENDANCE'] }
}, { timestamps: true });

export const Student = model('Student', studentSchema);
export const Faculty = model('Faculty', facultySchema);
export const Hod = model('Hod', hodSchema);
export const Mentor = model('Mentor', mentorSchema);
export const Timetable = model('Timetable', timetableSchema);
export const Attendance = model('Attendance', attendanceSchema);
export const LeaveApplication = model('LeaveApplication', leaveSchema);
export const MentorAlert = model('MentorAlert', alertSchema);
export const CallLog = model('CallLog', callLogSchema);
