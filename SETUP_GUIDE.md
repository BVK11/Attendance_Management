# Attendance Management System - Setup Guide

## Architecture Overview

```
Frontend (React + TypeScript)
       ↓ (HTTP Calls via apiService)
Backend API (Node.js + Express)
       ↓ (Queries)
MongoDB Database
```

## Complete Setup Instructions

### 1. MongoDB Setup

**Windows - Using MongoDB Community Edition:**

1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer and follow instructions
3. MongoDB runs as a service (default: `mongodb://127.0.0.1:27017`)

**Alternative - Using MongoDB Atlas (Cloud):**

1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get your connection string
3. Update `backend/.env` with your MongoDB URI

### 2. Backend Setup

```bash
cd backend
npm install
npm run seed     # Seed initial data into MongoDB
npm run dev      # Start development server on http://localhost:4000
```

### 3. Frontend Setup

```bash
npm install
npm run dev      # Start frontend on http://localhost:5173 (Vite)
```

## Frontend-Backend Integration

### API Service Layer
- **File:** `services/apiService.ts`
- **Purpose:** Centralized HTTP client for all backend calls
- **Usage:** `apiCall(endpoint, method, body?)`

### Auth Flow
1. User submits credentials via login form
2. `AuthContext.tsx` calls `apiService` → `POST /api/auth/login`
3. Backend validates credentials against MongoDB
4. User session stored in `sessionStorage`
5. Routes are protected by `ProtectedRoute` component

### API Endpoints Reference

**Authentication:**
- `POST /api/auth/login` - Login with email or roll number

**CRUD Endpoints:**
- `GET|POST /api/students`
- `GET|POST /api/faculty`
- `GET|POST /api/hods`
- `GET|POST /api/mentors`
- `GET|POST /api/timetable`
- `GET|POST /api/attendance`
- `GET|POST /api/leaves` + `PUT /api/leaves/:id`
- `GET|POST /api/alerts`
- `GET|POST /api/call-logs`

## Demo Credentials

### Faculty
- Email: `rammohan@necn.ac.in` | Password: `password`
- Email: `bvk@necn.ac.in` | Password: `password`

### HOD/Admin
- Email: `hod@necn.ac.in` | Password: `password`
- Email: `sunita.desai@college.edu` | Password: `hodpass`

### Mentor
- Email: `rajesh.gupta@college.edu` | Password: `mentorpass`
- Email: `priya.verma@college.edu` | Password: `mentorpass`

### Student (120 students seeded)
- Roll No: `CSE101` - `CSE180` | Password: `password`
- Roll No: `ECE101` - `ECE180` | Password: `password`

## Common Issues & Solutions

**Issue:** "Cannot connect to MongoDB"
- **Solution:** Ensure MongoDB service is running (Windows: Check Services or run `mongod`)
- **Alternative:** Use MongoDB Atlas with proper connection string in `.env`

**Issue:** Frontend shows "API connection failed"
- **Solution:** Verify backend is running on port 4000 and CORS is enabled
- **Check:** Visit `http://localhost:4000/` in browser

**Issue:** Login fails with 401 error
- **Solution:** Ensure backend has seeded data (`npm run seed`)
- **Check:** Verify credentials match seeded data

## Development Workflow

1. **Backend Development:**
   - Make changes to `backend/src/`
   - Dev server auto-reloads via `ts-node-dev`
   - API changes accessible immediately

2. **Frontend Development:**
   - Changes to `src/` auto-refresh via Vite
   - API calls use environment variable `VITE_API_URL`
   - Check browser console for errors

3. **Database Management:**
   - MongoDB Compass: Visual DB explorer (recommended)
   - mongosh: CLI tool included with MongoDB
   - Run `npm run seed` to reset with fresh data

## Project Structure

```
Attendance_Management-main/
├── backend/                      # Node.js/Express backend
│   ├── src/
│   │   ├── server.ts            # Express app entry point
│   │   ├── routes.ts            # API route handlers
│   │   ├── models.ts            # Mongoose schemas
│   │   ├── db.ts                # MongoDB connection
│   │   ├── config.ts            # Configuration
│   │   └── seed.ts              # Data seeding script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── src/                          # React frontend
│   ├── services/
│   │   ├── apiService.ts        # HTTP client
│   │   ├── apiStorageService.ts # API-based services
│   │   └── storageService.ts    # (deprecated - localStorage)
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context with API
│   ├── pages/                   # Page components
│   └── components/              # Reusable components
├── .env                         # Frontend API configuration
└── index.tsx                    # App entry point
```

## Next Steps

1. ✅ Frontend connected to backend API
2. ✅ Authentication using MongoDB
3. ⏭️ Implement data syncing for attendance/leave operations
4. ⏭️ Add real-time updates using WebSockets (optional)
5. ⏭️ Deploy to production (Vercel/Railway frontend, MongoDB Atlas)
