import {
    Student,
    Faculty,
    Hod,
    Mentor,
    AttendanceRecord,
    MentorAlert,
    TimetableEntry,
    LeaveApplication,
    CallLog
} from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

const getItem = <T,>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting item ${key}`, error);
        return null;
    }
};

const setItem = <T,>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item ${key}`, error);
    }
};

const createService = <T extends { id: string } | { rollNo: string }>(key: string) => ({
    getAll: (): T[] => getItem<T[]>(key) || [],
    getById: (id: string): T | undefined => {
        const items = getItem<T[]>(key) || [];
        if (items.length === 0) return undefined;
        const idKey = 'rollNo' in items[0] ? 'rollNo' : 'id';
        return items.find((item) => (item as any)[idKey] === id);
    },
    add: (item: T): void => {
        const items = getItem<T[]>(key) || [];
        setItem(key, [...items, item]);
    },
    update: (id: string, updatedItem: Partial<T>): void => {
        const items = getItem<T[]>(key) || [];
        if (items.length === 0) return;
        const idKey = 'rollNo' in items[0] ? 'rollNo' : 'id';
        const updatedItems = items.map((item) =>
            (item as any)[idKey] === id ? { ...item, ...updatedItem } : item
        );
        setItem(key, updatedItems);
    },
    remove: (id: string): void => {
        const items = getItem<T[]>(key) || [];
        if (items.length === 0) return;
        const idKey = 'rollNo' in items[0] ? 'rollNo' : 'id';
        setItem(
            key,
            items.filter((item) => (item as any)[idKey] !== id)
        );
    },
    setAll: (items: T[]): void => {
        setItem(key, items);
    }
});

export const studentService = createService<Student>(LOCAL_STORAGE_KEYS.STUDENTS);
export const facultyService = createService<Faculty>(LOCAL_STORAGE_KEYS.FACULTY);
export const hodService = createService<Hod>(LOCAL_STORAGE_KEYS.HODS);

export const mentorService = {
    ...createService<Mentor>(LOCAL_STORAGE_KEYS.MENTORS),
    getById: (mentorId: string): Mentor | undefined => {
        const mentors = getItem<Mentor[]>(LOCAL_STORAGE_KEYS.MENTORS) || [];
        return mentors.find(m => m.mentorId === mentorId);
    }
};

export const attendanceService = {
    getAll: (): AttendanceRecord[] =>
        getItem<AttendanceRecord[]>(LOCAL_STORAGE_KEYS.ATTENDANCE) || [],
    add: (record: AttendanceRecord): void => {
        const records = getItem<AttendanceRecord[]>(LOCAL_STORAGE_KEYS.ATTENDANCE) || [];
        setItem(LOCAL_STORAGE_KEYS.ATTENDANCE, [...records, record]);
    }
};

export const timetableService = {
    getAll: (): TimetableEntry[] =>
        getItem<TimetableEntry[]>(LOCAL_STORAGE_KEYS.TIMETABLE) || [],
    setAll: (entries: TimetableEntry[]): void =>
        setItem(LOCAL_STORAGE_KEYS.TIMETABLE, entries)
};

/* 🔴 IMPORTANT FIX HERE */
const baseLeaveService = createService<LeaveApplication>(LOCAL_STORAGE_KEYS.LEAVES);
export const leaveService = {
    ...baseLeaveService,
    update: (id: string, updatedItem: Partial<LeaveApplication>): void => {
        const items = getItem<LeaveApplication[]>(LOCAL_STORAGE_KEYS.LEAVES) || [];
        if (items.length === 0) return;

        const updatedItems = items.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
        );

        setItem(LOCAL_STORAGE_KEYS.LEAVES, updatedItems);

        // 🔔 force React + storage sync
        localStorage.setItem('__leave_sync__', Date.now().toString());
    }
};

export const callLogService = createService<CallLog>(LOCAL_STORAGE_KEYS.CALL_LOGS);

const baseAlertService = createService<MentorAlert>(LOCAL_STORAGE_KEYS.ALERTS);
export const alertService = {
    ...baseAlertService,
    addBatch: (newAlerts: MentorAlert[]): void => {
        const alerts = getItem<MentorAlert[]>(LOCAL_STORAGE_KEYS.ALERTS) || [];
        setItem(LOCAL_STORAGE_KEYS.ALERTS, [...alerts, ...newAlerts]);
    }
};
