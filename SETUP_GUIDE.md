# Quick Start Guide - Task Manager Application

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)
- Code editor (VS Code recommended)

---

## Step 1: MongoDB Atlas Setup (2 minutes)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Select "Free" (M0) tier
   - Choose your region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `taskmanager`
   - Password: Generate a secure password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - **IMPORTANT**: Replace `<password>` with your actual password
   - Replace `<database>` with `taskmanager`

Example connection string:
```
mongodb+srv://taskmanager:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

---

## Step 2: Backend Setup (2 minutes)

1. **Navigate to backend folder**
   ```powershell
   cd backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Create .env file**
   Create a file named `.env` in the `backend` folder with:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key_change_this
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Replace:**
   - `MONGODB_URI` with your actual MongoDB Atlas connection string
   - `JWT_SECRET` with a random secure string (at least 32 characters)

4. **Start the backend server**
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   Server is running on port 5000
   MongoDB Connected: cluster0-xxxxx.mongodb.net
   ```

✅ Backend is now running on http://localhost:5000

---

## Step 3: Frontend Setup (1 minute)

1. **Open a NEW terminal** (keep backend running)

2. **Navigate to frontend folder**
   ```powershell
   cd frontend
   ```

3. **Install dependencies**
   ```powershell
   npm install
   ```

4. **Verify .env file exists**
   The `.env` file should already exist with:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the React app**
   ```powershell
   npm start
   ```

   The browser will automatically open to http://localhost:3000

✅ Frontend is now running on http://localhost:3000

---

## Step 4: Test the Application

1. **Register a new account**
   - Click "Sign Up" or "Get Started Free"
   - Fill in your details
   - Click "Sign Up"

2. **Create your first task**
   - Click "New Task" or "Create Task"
   - Fill in task details
   - Click "Create Task"

3. **Try the features**
   - ✅ Create tasks
   - ✅ Edit tasks
   - ✅ Delete tasks
   - ✅ Filter by status/priority
   - ✅ Search tasks
   - ✅ Update profile

---

## 🎉 You're Done!

Your task manager is now running locally!

---

## Troubleshooting

### Backend won't start
- **Error: "Cannot connect to MongoDB"**
  - Check your MongoDB connection string in `.env`
  - Ensure you replaced `<password>` with actual password
  - Verify IP whitelist in MongoDB Atlas

- **Error: "Port 5000 already in use"**
  ```powershell
  # Find and kill process on port 5000
  netstat -ano | findstr :5000
  taskkill /PID <PID_NUMBER> /F
  ```

### Frontend won't start
- **Error: "Port 3000 already in use"**
  - Press `Y` when asked to use a different port
  - Or kill the process using port 3000

- **Error: "Cannot connect to backend"**
  - Ensure backend is running on port 5000
  - Check `REACT_APP_API_URL` in frontend `.env`

### Can't register/login
- Check browser console for errors (F12)
- Verify backend is running and MongoDB is connected
- Check network tab for API responses

---

## Testing with Postman

1. **Import Collection**
   - Open Postman
   - File → Import
   - Select `postman_collection.json` from project root
   - Click "Import"

2. **Set Variables**
   - Click on "Task Manager API" collection
   - Go to "Variables" tab
   - Set `base_url` to `http://localhost:5000/api`

3. **Test Endpoints**
   - Register User (saves token automatically)
   - Login User (saves token automatically)
   - Create Task
   - Get All Tasks
   - Update Task
   - Delete Task

---

## Project Structure

```
CRUD-ops/
├── backend/                    # Express.js Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   ├── errorHandler.js    # Error handling
│   │   └── validation.js      # Input validation
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── taskRoutes.js      # Task endpoints
│   ├── utils/
│   │   └── jwt.js             # JWT utilities
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/                   # React.js Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── TaskCard.js
│   │   │   ├── TaskModal.js
│   │   │   ├── Loader.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js # Auth state management
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Profile.js
│   │   ├── services/          # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── App.js             # Main component
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── tailwind.config.js     # Tailwind config
│
├── README.md                   # Project documentation
├── API_DOCUMENTATION.md        # API endpoints
├── DEPLOYMENT.md               # Deployment guide
├── SCALABILITY_NOTES.md        # Scaling recommendations
├── SETUP_GUIDE.md              # This file
└── postman_collection.json     # Postman collection
```

---

## Available Scripts

### Backend
```powershell
cd backend
npm start          # Start server in production mode
npm run dev        # Start server with nodemon (auto-reload)
```

### Frontend
```powershell
cd frontend
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
```

---

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...           # MongoDB connection string
JWT_SECRET=your_secret_key              # JWT signing key
PORT=5000                               # Server port
NODE_ENV=development                    # Environment
FRONTEND_URL=http://localhost:3000      # Frontend URL for CORS
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

---

## Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes
- ✅ Profile management
- ✅ Secure password hashing

### Task Management
- ✅ Create tasks
- ✅ Read/View tasks
- ✅ Update tasks
- ✅ Delete tasks
- ✅ Task status (pending, in-progress, completed)
- ✅ Task priority (low, medium, high)
- ✅ Due dates
- ✅ Tags/labels

### Dashboard Features
- ✅ Task statistics
- ✅ Search functionality
- ✅ Filter by status
- ✅ Filter by priority
- ✅ Sort tasks
- ✅ Responsive design

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS configuration

---

## Next Steps

1. **Explore the Application**
   - Create multiple tasks
   - Try different filters
   - Update your profile

2. **Read Documentation**
   - API_DOCUMENTATION.md - API reference
   - DEPLOYMENT.md - Deployment instructions
   - SCALABILITY_NOTES.md - Scaling recommendations

3. **Test with Postman**
   - Import the collection
   - Test all endpoints
   - Verify responses

4. **Deploy to Production**
   - Follow DEPLOYMENT.md
   - Set up MongoDB Atlas production cluster
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the documentation files
- Check browser console for errors (F12)
- Check backend terminal for errors

---

## Technologies Used

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for validation

**Frontend:**
- React.js
- React Router for navigation
- TailwindCSS for styling
- Axios for API calls
- React Context for state management
- React Toastify for notifications
- React Icons

---

## License

MIT License - Feel free to use this project for learning and development purposes.

---

**Congratulations! You now have a fully functional task manager application! 🎊**
