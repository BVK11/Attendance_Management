# Attendance Management System - Monorepo Structure

This project is now organized as a **monorepo** with separate frontend and backend folders for cleaner code organization.

## 📁 Project Structure

```
Attendance_Management-main/
│
├── 📁 backend/                    # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── server.ts              # Express app
│   │   ├── routes.ts              # API endpoints
│   │   ├── models.ts              # MongoDB schemas
│   │   ├── db.ts                  # Database connection
│   │   ├── config.ts              # Configuration
│   │   └── seed.ts                # Data seeding script
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
│
├── 📁 frontend/                   # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── components/            # Reusable UI components
│   │   ├── contexts/              # React contexts (Auth)
│   │   ├── hooks/                 # Custom hooks
│   │   ├── services/              # API communication layer
│   │   └── pages/                 # Page components
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── .env
│   └── .gitignore
│
├── 📄 README.md                   # Project overview
├── 📄 SETUP_GUIDE.md              # Complete setup instructions
├── 📄 FRONTEND_STRUCTURE_GUIDE.md # Frontend folder structure details
└── .gitignore                     # Root level git ignore

```

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seed MongoDB with initial data
npm run dev      # Start server on http://localhost:4000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Start frontend on http://localhost:5173
```

### 3. Access Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`
- Backend Health Check: `http://localhost:4000/`

## 📚 Documentation

- **Complete Setup**: Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Frontend Structure**: Read [FRONTEND_STRUCTURE_GUIDE.md](FRONTEND_STRUCTURE_GUIDE.md)
- **Backend API**: Check [backend/README.md](backend/README.md)

## 🔑 Demo Credentials

### Faculty
- Email: `rammohan@necn.ac.in` | Password: `password`

### HOD/Admin
- Email: `hod@necn.ac.in` | Password: `password`

### Mentor
- Email: `rajesh.gupta@college.edu` | Password: `mentorpass`

### Student
- Roll No: `CSE101` - `CSE180` | Password: `password`
- Roll No: `ECE101` - `ECE180` | Password: `password`

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │
│  (Port 5173)    │
└────────┬────────┘
         │ HTTP REST API
         ↓
┌─────────────────┐
│  Express Backend│
│  (Port 4000)    │
└────────┬────────┘
         │ Query
         ↓
┌─────────────────┐
│    MongoDB      │
│    Database     │
└─────────────────┘
```

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v7

**Backend:**
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## 👥 Key Features

✅ Role-based authentication (Faculty, HOD, Mentor, Student)
✅ Attendance management
✅ Leave applications with AI assessment
✅ Real-time alerts for mentors
✅ Student performance tracking
✅ Timetable management

## 📝 Development Workflow

1. **Make changes** in `frontend/src/` or `backend/src/`
2. **Frontend auto-reloads** via Vite dev server
3. **Backend auto-reloads** via `ts-node-dev`
4. **Check browser console** for frontend errors
5. **Check terminal** for backend errors

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend can't connect to backend | Ensure backend is running on `:4000` and CORS is enabled |
| MongoDB connection error | Start MongoDB service or use MongoDB Atlas connection string |
| Port already in use | Change port in `vite.config.ts` (frontend) or `backend/src/config.ts` |
| Dependencies not installed | Run `npm install` in both backend/ and frontend/ folders |

## 📦 Project Size Comparison

**Before (Everything in Root):** Harder to navigate, mixed concerns
**After (Organized Structure):** Clear separation, easier maintenance

## 🔄 Git Structure

Both frontend and backend have their own `.gitignore` files. Root `.gitignore` includes:
- `node_modules/` (both directories)
- `.env` files (secrets)
- Build outputs

## 📞 Support

For setup issues, refer to:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
- [FRONTEND_STRUCTURE_GUIDE.md](FRONTEND_STRUCTURE_GUIDE.md) - Frontend details
- [backend/README.md](backend/README.md) - Backend API reference

---

**Status:** ✅ Reorganized into monorepo structure with separated frontend and backend
