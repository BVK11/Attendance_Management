# Start MongoDB Backend

## Prerequisite: MongoDB must be running

### Windows
Open a new PowerShell and run:
```powershell
# If MongoDB is installed as a service, it starts automatically
# Otherwise, run:
mongod
```

### Verify MongoDB is running
Open another terminal and run:
```powershell
mongosh
# You should see a MongoDB shell prompt
# Type exit to close
```

---

## Step 1: Start Backend Server

```powershell
cd backend
npm run seed     # Initialize database with seed data
npm run dev      # Start server on http://localhost:4000
```

You should see:
```
MongoDB connected: mongodb://127.0.0.1:27017/attendance_management
Backend listening on http://localhost:4000
```

Test the backend:
```powershell
# In another terminal
curl http://localhost:4000/
# Should return: {"status":"Attendance Management backend","version":"1.0.0"}
```

---

## Step 2: Start Frontend Server

```powershell
# From root directory
npm run dev
# Website opens at http://localhost:5173
```

---

## Step 3: Test Login

Use any of these credentials:

**Faculty:**
- Email: `rammohan@necn.ac.in`
- Password: `password`

**Student:**
- Roll No: `CSE101`
- Password: `password`

---

## Troubleshooting

### "Cannot connect to MongoDB"
```powershell
# Check MongoDB service on Windows
Get-Service MongoDB

# Or start MongoDB manually
mongod
```

### "EADDRINUSE: address already in use :::4000"
```powershell
# Kill the process using port 4000
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force
```

### "Invalid credentials"
- Ensure `npm run seed` was executed
- Check the demo credentials above
- Try: `CSE102` instead of `CSE101`

### Frontend shows "API connection error"
- Verify backend is running: `http://localhost:4000/`
- Check VITE_API_URL in frontend `.env`
- Check browser console for CORS errors
