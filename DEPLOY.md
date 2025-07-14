# 🚀 One-Click Deployment

Deploy your authentication website to free hosting with these buttons:

## Frontend Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mohit7276/authentication-website&env=VITE_API_URL&envDescription=Backend%20API%20URL)

**After clicking:**
1. Login with GitHub
2. Set `VITE_API_URL` to your backend URL (see below)
3. Deploy!

## Backend Deployment (Render)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mohit7276/authentication-website)

**Required Environment Variables for Render:**
```
MONGODB_URI=mongodb+srv://mohit7276:%40Mohit1212@cluster0.ex9i2tk.mongodb.net/authapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-production-key-2024
NODE_ENV=production
GOOGLE_CLIENT_ID=848381710448-ccfoalo5n2id2vn8kmr8i07aj175b8q5.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

## Alternative: Railway (All-in-One)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/mongodb-auth)

## Manual Deployment Steps

### 1. Vercel (Frontend)
```bash
npx vercel --prod
```

### 2. Render (Backend)
- Connect GitHub repo
- Set root directory to `server`
- Add environment variables
- Deploy

## 🌐 After Deployment

Your website will be available at:
- **Frontend:** `https://authentication-website-mohit7276.vercel.app`
- **Backend:** `https://authentication-website-backend.onrender.com`
- **Status:** 24/7 online, accessible worldwide

## Features After Deployment
✅ User Registration/Login
✅ Google OAuth
✅ Mobile Responsive
✅ Global CDN (Fast loading worldwide)
✅ HTTPS Security
✅ Auto-deployment from GitHub
✅ Zero maintenance required

## 🔧 Troubleshooting

**CORS Errors:** Backend URL must be added to frontend environment
**Database Connection:** Verify MongoDB Atlas allows all IPs (0.0.0.0/0)
**OAuth Issues:** Update redirect URIs in Google Console with new domain

---

**💡 Pro Tip:** After deployment, anyone can access your website 24/7 using the public URLs, even when your computer is completely off!
