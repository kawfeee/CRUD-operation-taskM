# 🚀 WHAT YOU NEED TO DO

## Before Running the Application

### 1. Get MongoDB Atlas Connection String

**YOU MUST DO THIS FIRST!**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a free cluster (M0)
4. Create a database user (username + password)
5. Whitelist your IP (or allow all: 0.0.0.0/0)
6. Get your connection string (it looks like this):

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

**SAVE THIS STRING - YOU'LL NEED IT!**

---

### 2. Update Backend .env File

📁 Go to: `backend/.env` (create this file if it doesn't exist)

Add these lines:
```env
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
JWT_SECRET=your_very_secret_random_string_at_least_32_characters_long
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Replace:**
- `MONGODB_URI` with your actual MongoDB Atlas connection string
- `JWT_SECRET` with any long random string (e.g., `mysupersecretjwtkey123456789012345678901234567890`)

---

### 3. Install & Run Backend

Open PowerShell/Terminal:

```powershell
cd backend
npm install
npm run dev
```

✅ You should see: "Server is running on port 5000" and "MongoDB Connected"

If you see errors, check your MongoDB connection string!

---

### 4. Install & Run Frontend

Open a NEW PowerShell/Terminal (keep backend running):

```powershell
cd frontend
npm install
npm start
```

✅ Browser should open automatically to http://localhost:3000

---

## 🎉 That's It!

Now you can:
1. Click "Sign Up" to create an account
2. Login with your credentials
3. Start creating tasks!

---

## 📚 Read These Next

1. **SETUP_GUIDE.md** - Detailed setup with troubleshooting
2. **API_DOCUMENTATION.md** - Complete API reference
3. **DEPLOYMENT.md** - How to deploy to production
4. **PROJECT_SUMMARY.md** - Complete project overview

---

## ⚠️ Troubleshooting

### Backend won't start?
- Check MongoDB connection string in `backend/.env`
- Make sure you replaced `<password>` with your actual password
- Verify IP is whitelisted in MongoDB Atlas

### Frontend won't connect?
- Make sure backend is running on port 5000
- Check `frontend/.env` has: `REACT_APP_API_URL=http://localhost:5000/api`

### Port already in use?
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

## 📝 Quick Reference

**Backend runs on:** http://localhost:5000
**Frontend runs on:** http://localhost:3000

**Backend folder:** `backend/`
**Frontend folder:** `frontend/`

**Backend .env:** `backend/.env`
**Frontend .env:** `frontend/.env` (already created, no changes needed)

---

## 🔥 IMPORTANT

**DO NOT commit .env files to git!**

They are already in .gitignore, but be careful not to share your:
- MongoDB connection string
- JWT secret
- Any passwords

---

Need help? Check SETUP_GUIDE.md for detailed instructions!
