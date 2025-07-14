# 🔐 Google OAuth Setup Guide

## Quick Setup for Your Authentication App

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project or select an existing one

### Step 2: Enable Required APIs
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API" and click "Enable"
3. Also enable "Google Identity API" if available

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields (App name, User support email, Developer email)
   - Add your email in test users
   - Save and continue through all steps

### Step 4: Configure OAuth Client ID
1. Application type: **Web application**
2. Name: `AuthApp Local Development`
3. Authorized JavaScript origins:
   ```
   http://localhost:3000
   http://localhost:5000
   ```
4. Authorized redirect URIs:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
5. Click "Create"

### Step 5: Get Your Credentials
1. Copy the **Client ID** and **Client Secret**
2. Update your `.env` file in the server folder:
   ```
   GOOGLE_CLIENT_ID=your-actual-client-id-here
   GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
   ```

### Step 6: Restart Your Application
1. Stop the backend server (Ctrl+C in the server terminal)
2. Restart with: `npm run dev`
3. Test the Google login button

## 🚨 Important Notes:
- Keep your Client Secret private
- For production, add your actual domain to authorized origins
- The OAuth consent screen needs to be configured for external users
- Add test users in the OAuth consent screen if your app is not published

## 🧪 Testing:
1. Go to http://localhost:3000
2. Click "Google" button
3. Should redirect to Google login
4. After successful login, redirects back to your app

## 🔧 Troubleshooting:
- **403 Error**: OAuth credentials not configured or incorrect
- **Redirect URI mismatch**: Check authorized redirect URIs in Google Console
- **App not verified**: Add test users or publish the app for verification
