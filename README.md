# Task Manager - Full Stack Web Application

A scalable task management application built with React.js, TailwindCSS, Node.js, Express.js, and MongoDB Atlas.

## Features

- **User Authentication**: JWT-based secure authentication with signup/login/logout
- **Task Management**: Full CRUD operations on tasks
- **Dashboard**: User profile and task management interface
- **Search & Filter**: Search and filter tasks by status, priority, etc.
- **Responsive Design**: Mobile-first design using TailwindCSS
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Security**: Password hashing with bcrypt, JWT token validation

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- TailwindCSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js & Express.js
- MongoDB Atlas (Database)
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation

## Project Structure

```
CRUD-ops/
├── backend/              # Express.js backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, validation)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/            # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── services/    # API services
│   │   ├── utils/       # Helper functions
│   │   └── App.js       # Main app component
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Security Features

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Protected routes with authentication middleware
- Input validation on both client and server
- Error handling middleware
- CORS configuration

## Scalability Considerations

### Current Architecture
- Modular code structure with separation of concerns
- RESTful API design
- Token-based authentication (stateless)
- MongoDB Atlas for cloud database

### Production Scaling Recommendations

1. **Backend Scaling**
   - Deploy on cloud platforms (AWS, Heroku, DigitalOcean)
   - Use PM2 or similar for process management
   - Implement rate limiting
   - Add caching layer (Redis)
   - Use load balancers for horizontal scaling
   - Implement database indexing
   - Add API versioning

2. **Frontend Scaling**
   - Deploy on CDN (Vercel, Netlify, Cloudflare)
   - Implement code splitting
   - Add lazy loading for routes
   - Optimize bundle size
   - Use service workers for offline support
   - Implement state management (Redux/Zustand) for complex state

3. **Security Enhancements**
   - Add refresh token mechanism
   - Implement rate limiting
   - Add HTTPS/SSL certificates
   - Environment-based configuration
   - Add logging and monitoring (Winston, Sentry)
   - Implement CSRF protection

4. **Database Optimization**
   - Add indexes for frequently queried fields
   - Implement pagination for large datasets
   - Use database connection pooling
   - Consider database replication

## Testing

Run tests:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Deployment

### Backend Deployment (Heroku Example)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Follow platform-specific deployment instructions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Built as part of a full-stack development assignment.
