# 🚀 Deployment Guide

This guide will help you deploy your authentication website so it's accessible 24/7, even when your PC is off.

## 🌐 Live Demo
- **Frontend:** https://authentication-website-mohit7276.vercel.app
- **Backend:** https://authentication-website-backend.onrender.com

## 📋 Deployment Steps

### 1. Backend Deployment (Render - Free)

1. **Go to [render.com](https://render.com)** and sign up
2. **Connect your GitHub account**
3. **Create New Web Service**
4. **Select your repository:** `mohit7276/authentication-website`
5. **Configure the service:**
   - **Name:** `authentication-website-backend`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Auto-Deploy:** Yes

6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/authapp
   JWT_SECRET=your-super-secret-random-string
   NODE_ENV=production
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### 2. Database Setup (MongoDB Atlas - Free)

1. **Go to [mongodb.com/atlas](https://mongodb.com/atlas)**
2. **Create free account and cluster**
3. **Get connection string** and update `MONGODB_URI`
4. **Add your deployment IP** to allowed IPs (or use 0.0.0.0/0 for all)

### 3. Frontend Deployment (Vercel - Free)

1. **Go to [vercel.com](https://vercel.com)** and sign up
2. **Import your GitHub repository**
3. **Configure:**
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### 4. Google OAuth Setup

1. **Go to [console.cloud.google.com](https://console.cloud.google.com)**
2. **Create new project or select existing**
3. **Enable Google+ API**
4. **Create OAuth 2.0 credentials**
5. **Add authorized redirect URIs:**
   ```
   https://your-backend-url.onrender.com/api/auth/google/callback
   ```

## 🔧 Quick Deploy Commands

```bash
# 1. Push latest changes
git add .
git commit -m "Deploy to production"
git push origin main

# 2. Both services will auto-deploy from GitHub
```

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible  
- [ ] Database connected
- [ ] Google OAuth working
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] SSL certificates active (automatically handled)

## 🌍 Your Live URLs

After deployment, update these in your README:
- **Website:** https://authentication-website-mohit7276.vercel.app
- **API:** https://authentication-website-backend.onrender.com

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS errors:** Check backend CORS configuration
2. **OAuth not working:** Verify redirect URIs in Google Console
3. **Database connection:** Check MongoDB Atlas connection string
4. **Build failures:** Check Node.js version compatibility

### Logs:
- **Render:** Dashboard → Service → Logs
- **Vercel:** Dashboard → Project → Functions tab
- **MongoDB:** Atlas → Monitoring

## 💰 Cost
- **Render:** Free tier (will sleep after 30min of inactivity)
- **Vercel:** Free tier (generous limits)
- **MongoDB Atlas:** Free tier (512MB storage)
- **Total:** $0/month for personal projects

## 🔄 Auto-Deployment
Both services are configured for auto-deployment. Every time you push to GitHub:
1. Render will rebuild and deploy your backend
2. Vercel will rebuild and deploy your frontend

## 📞 Support
If you need help with deployment, the services offer:
- Render: Discord community + documentation
- Vercel: GitHub discussions + documentation  
- MongoDB: Community forums + documentation
