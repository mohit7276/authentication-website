# OAuth Setup Guide

This authentication system supports Google and Facebook OAuth. However, you need to set up OAuth applications first.

## 🔧 Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`

4. **Update .env file**
   ```
   GOOGLE_CLIENT_ID=your-actual-google-client-id
   GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
   ```

## 📘 Facebook OAuth Setup

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/
   - Create a new app

2. **Set up Facebook Login**
   - Add "Facebook Login" product
   - Configure OAuth redirect URIs:
     - `http://localhost:5000/api/auth/facebook/callback`

3. **Update .env file**
   ```
   FACEBOOK_APP_ID=your-actual-facebook-app-id
   FACEBOOK_APP_SECRET=your-actual-facebook-app-secret
   ```

## 🚀 After Setup

1. Update the `.env` file with real credentials
2. Restart the backend server: `npm run dev` (in server folder)
3. Uncomment the `window.location.href` lines in Register.jsx and Login.jsx
4. Remove the alert messages

## 🧪 Testing Without OAuth

For now, the social login buttons will show setup instructions. You can:
- Use email registration and login
- Test all other features normally
- Set up OAuth when you're ready for production

## 📁 File Locations

- **Backend config**: `server/config/passport.js`
- **Environment variables**: `server/.env`
- **Frontend components**: `src/components/auth/Register.jsx` and `src/components/auth/Login.jsx`
