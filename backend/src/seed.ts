import mongoose from 'mongoose';
import { MONGODB_URI } from './config';
import {
  Student,
  Faculty,
  Hod,
  Mentor,
  Timetable
} from './models';

const students = Array.from({ length: 120 }, (_, i) => {
  const dept = i < 60 ? 'CSE' : 'ECE';
  const sec = (i % 60) < 30 ? 'A' : 'B';
  const mentor = dept === 'CSE'
    ? (sec === 'A' ? 'MENTOR_CSE_1' : 'MENTOR_CSE_2')
    : (sec === 'A' ? 'MENTOR_ECE_1' : 'MENTOR_ECE_2');

  return {
    rollNo: `${dept}${101 + i}`,
    name: `Student ${101 + i}`,
    password: 'password',
    parentContact: `9876543${101 + i}`,
    mentorId: mentor,
    department: dept,
    section: sec
  };
});

const faculty = [
  { id: 'FAC01', name: 'Prof. Ram Mohan', email: 'Rammohan@necn.ac.in', department: 'CSE', password: 'password', isActive: true },
  { id: 'FAC02', name: 'Prof. Bvk', email: 'bvk@necn.ac.in', department: 'ECE', password: 'password', isActive: true }
];

const hods = [
  { id: 'HOD01', name: 'Dr. Ramesh Kumar', email: 'Hod@necn.ac.in', department: 'CSE', password: 'password', isActive: true },
  { id: 'HOD02', name: 'Dr. Sunita Desai', email: 'sunita.desai@college.edu', department: 'ECE', password: 'hodpass', isActive: true }
];

const mentors = [
  { id: 'MENTOR01', name: 'Mr. Rajesh Gupta', mentorId: 'MENTOR_CSE_1', email: 'rajesh.gupta@college.edu', password: 'mentorpass', isActive: true, department: 'CSE' },
  { id: 'MENTOR02', name: 'Ms. Priya Verma', mentorId: 'MENTOR_CSE_2', email: 'priya.verma@college.edu', password: 'mentorpass', isActive: true, department: 'CSE' },
  { id: 'MENTOR03', name: 'Mr. Suresh Patil', mentorId: 'MENTOR_ECE_1', email: 'suresh.patil@college.edu', password: 'mentorpass', isActive: true, department: 'ECE' },
  { id: 'MENTOR04', name: 'Ms. Deepa Mehta', mentorId: 'MENTOR_ECE_2', email: 'deepa.mehta@college.edu', password: 'mentorpass', isActive: true, department: 'ECE' }
];

const subjects = ['Mathematics', 'Physics', 'Programming', 'Data Structures', 'Networks', 'AI', 'Ethics', 'Digital Circuits'];
const faculties = ['Dr. Smith', 'Prof. Jones', 'Ms. Taylor', 'Mr. White'];

const timetable: Array<Record<string, unknown>> = [];
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
  ['CSE', 'ECE'].forEach(dept => {
    ['A', 'B'].forEach(sec => {
      for (let period = 1; period <= 5; period += 1) {
        timetable.push({
          id: `${day}-${dept}-${sec}-${period}`,
          day,
          period,
          subject: subjects[Math.floor(Math.random() * subjects.length)],
          faculty: faculties[Math.floor(Math.random() * faculties.length)],
          startTime: `${8 + period}:00 AM`,
          endTime: `${9 + period}:00 AM`,
          department: dept,
          section: sec
        });
      }
    });
  });
});

const main = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding.');

  await Student.deleteMany({});
  await Faculty.deleteMany({});
  await Hod.deleteMany({});
  await Mentor.deleteMany({});
  await Timetable.deleteMany({});

  await Student.insertMany(students);
  await Faculty.insertMany(faculty);
  await Hod.insertMany(hods);
  await Mentor.insertMany(mentors);
  await Timetable.insertMany(timetable);

  console.log('Seed data inserted.');
  await mongoose.disconnect();
};

main().catch(error => {
  console.error('Seed error:', error);
  process.exit(1);
});
