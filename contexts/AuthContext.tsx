
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthenticatedUser, UserRole } from '../types';
import { facultyService, hodService, mentorService, studentService } from '../services/storageService';

interface AuthContextType {
  user: AuthenticatedUser | null;
  login: (emailOrRoll: string, password?: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(() => {
    const storedUser = sessionStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('authUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('authUser');
    }
  }, [user]);

  const login = (emailOrRoll: string, password?: string): boolean => {
    let authenticatedUser: AuthenticatedUser | null = null;
    
    // Check Faculty
    const facultyMember = facultyService.getAll().find(f => f.email === emailOrRoll && f.password === password);
    if (facultyMember) {
        if (!facultyMember.isActive) return false;
        authenticatedUser = { id: facultyMember.id, name: facultyMember.name, role: UserRole.Faculty, department: facultyMember.department };
    }

    // Check HOD
    if (!authenticatedUser) {
        const hod = hodService.getAll().find(h => h.email === emailOrRoll && h.password === password);
        if (hod) {
            if (!hod.isActive) return false;
            authenticatedUser = { id: hod.id, name: hod.name, role: UserRole.Hod, department: hod.department };
        }
    }

    // Check Mentor
    if (!authenticatedUser) {
        const mentor = mentorService.getAll().find(m => m.email === emailOrRoll && m.password === password);
        if (mentor) {
            if (!mentor.isActive) return false;
            authenticatedUser = { id: mentor.id, name: mentor.name, role: UserRole.Mentor, mentorId: mentor.mentorId };
        }
    }

    // Check Student (NEW)
    if (!authenticatedUser) {
        const student = studentService.getAll().find(s => s.rollNo === emailOrRoll && s.password === password);
        if (student) {
            authenticatedUser = { 
                id: student.rollNo, 
                name: student.name, 
                role: UserRole.Student, 
                department: student.department,
                section: student.section,
                rollNo: student.rollNo
            };
        }
    }
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
