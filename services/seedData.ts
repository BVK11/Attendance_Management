
import { Student, Faculty, Hod, Mentor, TimetableEntry } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

const seedStudents: Student[] = Array.from({ length: 120 }, (_, i) => {
    const dept = i < 60 ? 'CSE' : 'ECE';
    const sec = (i % 60) < 30 ? 'A' : 'B';
    const mentor = dept === 'CSE' ? (sec === 'A' ? 'MENTOR_CSE_1' : 'MENTOR_CSE_2') : (sec === 'A' ? 'MENTOR_ECE_1' : 'MENTOR_ECE_2');
    return {
        rollNo: `${dept}${101 + i}`,
        name: `Student ${101 + i}`,
        password: 'password', // Default password for all students
        parentContact: `9876543${101 + i}`,
        mentorId: mentor,
        department: dept,
        section: sec,
    };
});

const seedFaculty: Faculty[] = [
    { id: 'FAC01', name: 'Prof. Ram Mohan', email: 'Rammohan@necn.ac.in', department: 'CSE', password: 'password', isActive: true },
    { id: 'FAC02', name: 'Prof. Bvk', email: 'bvk@necn.ac.in', department: 'ECE', password: 'password', isActive: true },
];

const seedHods: Hod[] = [
    { id: 'HOD01', name: 'Dr. Ramesh Kumar', email: 'Hod@necn.ac.in', department: 'CSE', password: 'password', isActive: true },
    { id: 'HOD02', name: 'Dr. Sunita Desai', email: 'sunita.desai@college.edu', department: 'ECE', password: 'hodpass', isActive: true },
];

const seedMentors: Mentor[] = [
    { id: 'MENTOR01', name: 'Mr. Rajesh Gupta', mentorId: 'MENTOR_CSE_1', email: 'rajesh.gupta@college.edu', password: 'mentorpass', isActive: true, department: 'CSE' },
    { id: 'MENTOR02', name: 'Ms. Priya Verma', mentorId: 'MENTOR_CSE_2', email: 'priya.verma@college.edu', password: 'mentorpass', isActive: true, department: 'CSE' },
    { id: 'MENTOR03', name: 'Mr. Suresh Patil', mentorId: 'MENTOR_ECE_1', email: 'suresh.patil@college.edu', password: 'mentorpass', isActive: true, department: 'ECE' },
    { id: 'MENTOR04', name: 'Ms. Deepa Mehta', mentorId: 'MENTOR_ECE_2', email: 'deepa.mehta@college.edu', password: 'mentorpass', isActive: true, department: 'ECE' },
];

const subjects = ['Mathematics', 'Physics', 'Programming', 'Data Structures', 'Networks', 'AI', 'Ethics', 'Digital Circuits'];
const faculties = ['Dr. Smith', 'Prof. Jones', 'Ms. Taylor', 'Mr. White'];

const seedTimetable: TimetableEntry[] = [];
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
    ['CSE', 'ECE'].forEach(dept => {
        ['A', 'B'].forEach(sec => {
            for (let period = 1; period <= 5; period++) {
                seedTimetable.push({
                    id: `${day}-${dept}-${sec}-${period}`,
                    day: day as any,
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

export const initializeData = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.STUDENTS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.STUDENTS, JSON.stringify(seedStudents));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.FACULTY)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.FACULTY, JSON.stringify(seedFaculty));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.HODS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.HODS, JSON.stringify(seedHods));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.MENTORS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.MENTORS, JSON.stringify(seedMentors));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.TIMETABLE)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TIMETABLE, JSON.stringify(seedTimetable));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.ATTENDANCE)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.ALERTS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ALERTS, JSON.stringify([]));
    }
};
