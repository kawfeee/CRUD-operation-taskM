# Deployment Guide

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Production Best Practices](#production-best-practices)

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Cluster"
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Grant "Read and write to any database" privilege

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses

5. **Get Connection String**
   - Go to "Database" and click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database-name>` with your preferred database name (e.g., `taskmanager`)

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

---

## Backend Deployment

### Option 1: Heroku (Free Tier Available)

1. **Prerequisites**
   - Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   - Create a Heroku account

2. **Prepare for Deployment**
   ```bash
   cd backend
   ```

3. **Create Heroku App**
   ```bash
   heroku login
   heroku create your-app-name-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set JWT_SECRET="your_super_secret_jwt_key"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-frontend-url.com"
   ```

5. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

6. **Verify Deployment**
   ```bash
   heroku logs --tail
   heroku open
   ```

### Option 2: Railway (Alternative)

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in the "Variables" tab
6. Deploy automatically on push

### Option 3: DigitalOcean App Platform

1. Create a DigitalOcean account
2. Go to App Platform
3. Create a new app from your GitHub repository
4. Configure environment variables
5. Set build command: `npm install`
6. Set run command: `npm start`

### Option 4: VPS (Ubuntu Server)

1. **Setup Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd backend
   npm install
   ```

4. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

5. **Start with PM2**
   ```bash
   pm2 start server.js --name taskmanager-api
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx (Optional)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/api.yourdomain.com
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable and restart:
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.yourdomain.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel login
   vercel
   ```

3. **Configure Environment Variables**
   - Go to your project settings on Vercel
   - Add environment variable:
     - `REACT_APP_API_URL`: Your backend API URL

4. **Automatic Deployments**
   - Connect your GitHub repository
   - Vercel will automatically deploy on push to main branch

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the Project**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify login
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add: `REACT_APP_API_URL`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 4: AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Enable static website hosting
   - Upload build folder contents

3. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Configure caching and SSL

---

## Environment Configuration

### Backend (.env)

**Development:**
```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_development_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Production:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=very_secure_random_string_for_production_use_a_generator
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)

**Development:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Production:**
```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

---

## Production Best Practices

### Security

1. **Use Strong JWT Secret**
   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Enable CORS Properly**
   - Only allow specific origins in production
   - Update backend `server.js` CORS configuration

3. **Use HTTPS**
   - Always use SSL certificates in production
   - Use Let's Encrypt for free SSL

4. **Rate Limiting**
   - Already configured in the backend
   - Adjust limits based on your needs

5. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific secret management

### Performance

1. **Enable Gzip Compression**
   ```bash
   npm install compression
   ```
   
   Add to server.js:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Database Indexing**
   - Indexes are already configured in models
   - Monitor slow queries

3. **Caching**
   - Implement Redis for session management
   - Cache frequently accessed data

4. **CDN**
   - Use CDN for static assets
   - Vercel and Netlify provide this automatically

### Monitoring

1. **Error Tracking**
   - Use Sentry or similar service
   - Add error logging middleware

2. **Performance Monitoring**
   - Use New Relic or similar
   - Monitor API response times

3. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Set up alerts

### Backup

1. **Database Backups**
   - MongoDB Atlas provides automatic backups
   - Set up additional backup strategy

2. **Code Backups**
   - Use GitHub/GitLab
   - Tag releases properly

---

## Scaling Recommendations

### When to Scale

- **Frontend**: When you exceed 100,000 monthly active users
- **Backend**: When response times exceed 500ms consistently
- **Database**: When you exceed 10GB of data or 100 connections

### How to Scale

1. **Horizontal Scaling**
   - Deploy multiple backend instances
   - Use load balancer (Nginx, AWS ELB)
   - Implement session management with Redis

2. **Vertical Scaling**
   - Upgrade server resources
   - Increase database tier

3. **Database Optimization**
   - Add read replicas
   - Implement caching layer
   - Optimize queries

4. **Frontend Optimization**
   - Code splitting
   - Lazy loading
   - Service workers
   - PWA implementation

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL in backend .env
   - Verify CORS configuration

2. **Database Connection Fails**
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format
   - Ensure database user has correct permissions

3. **JWT Token Issues**
   - Verify JWT_SECRET matches between environments
   - Check token expiration time

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

---

## Support

For issues or questions:
- Check the [API Documentation](API_DOCUMENTATION.md)
- Review error logs
- Check MongoDB Atlas logs
- Review deployment platform logs

---

## Checklist Before Going Live

- [ ] MongoDB Atlas cluster created and configured
- [ ] Strong JWT secret generated
- [ ] All environment variables set correctly
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured properly
- [ ] SSL certificates installed (HTTPS)
- [ ] Error monitoring set up
- [ ] Database backups configured
- [ ] API endpoints tested with Postman
- [ ] User registration and login tested
- [ ] Task CRUD operations tested
- [ ] Mobile responsiveness verified
- [ ] Performance tested
- [ ] Security audit completed
