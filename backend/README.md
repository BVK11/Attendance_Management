# Attendance Management Backend

This backend is built with Node.js, Express, TypeScript, and MongoDB.

## Setup

1. Copy `.env.example` to `.env`.
2. Update `MONGODB_URI` if needed.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Seed initial data:
   ```bash
   npm run seed
   ```
5. Run in development:
   ```bash
   npm run dev
   ```

## API base URL

- `http://localhost:4000/api`

## Important endpoints

- `POST /api/auth/login`
- `GET /api/students`
- `POST /api/students`
- `GET /api/faculty`
- `POST /api/faculty`
- `GET /api/hods`
- `POST /api/hods`
- `GET /api/mentors`
- `POST /api/mentors`
- `GET /api/timetable`
- `POST /api/timetable`
- `GET /api/attendance`
- `POST /api/attendance`
- `GET /api/leaves`
- `POST /api/leaves`
- `PUT /api/leaves/:id`
- `GET /api/alerts`
- `POST /api/alerts`
- `GET /api/call-logs`
- `POST /api/call-logs`
