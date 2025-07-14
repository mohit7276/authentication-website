# 🚀 Deployment Guide - Authentication Website

## Deploy to Render (Free Hosting)

### Prerequisites
1. Push your code to GitHub repository
2. Have a Render account (free at render.com)

### Step 1: Deploy Backend
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `mohit7276/authentication-website`
4. Configure the service:
   - **Name**: `authentication-website-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   PORT=10000
   MONGODB_URI=mongodb+srv://mohit7276:%40Mohit1212@cluster0.ex9i2tk.mongodb.net/authapp?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=SuperSecureJWT2024Key!AuthWebsite
   SESSION_SECRET=SecureSession2024AuthApp!
   NODE_ENV=production
   GOOGLE_CLIENT_ID=848381710448-ccfoalo5n2id2vn8kmr8i07aj175b8q5.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   FRONTEND_URL=https://authentication-website-frontend.onrender.com
   ```

6. Click "Create Web Service"

### Step 2: Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `authentication-website-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://authentication-website-backend.onrender.com
   ```

5. Click "Create Static Site"

### Step 3: Update Google OAuth
After deployment, update your Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client ID
3. Add to **Authorized JavaScript origins**:
   ```
   https://authentication-website-frontend.onrender.com
   https://authentication-website-backend.onrender.com
   ```
4. Add to **Authorized redirect URIs**:
   ```
   https://authentication-website-backend.onrender.com/api/auth/google/callback
   ```

### Step 4: Test Your Live Website
- **Frontend**: https://authentication-website-frontend.onrender.com
- **Backend**: https://authentication-website-backend.onrender.com

## Alternative: Deploy with Vercel (Frontend) + Render (Backend)

### Deploy Frontend to Vercel:
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable:
   ```
   VITE_API_URL=https://authentication-website-backend.onrender.com
   ```
4. Deploy!

### Benefits:
- ✅ **Free hosting**
- ✅ **Automatic deployments** when you push to GitHub
- ✅ **Global CDN** for fast loading
- ✅ **HTTPS by default**
- ✅ **Custom domains** available

## 🔄 Auto-Deploy Setup
Both platforms automatically redeploy when you push to your GitHub repository!

## 🌐 Your Live URLs (after deployment):
- **Website**: https://authentication-website-frontend.onrender.com
- **API**: https://authentication-website-backend.onrender.com/api

## 📱 Testing Google Login:
Once deployed, anyone can visit your website and log in with Google from anywhere in the world!
