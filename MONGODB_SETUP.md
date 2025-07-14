# 🗄️ MongoDB Atlas Setup Guide

Follow these steps to set up your free MongoDB database for 24/7 online access.

## 📋 Quick Setup Steps

### 1. Create Account
- Go to **[mongodb.com/atlas](https://mongodb.com/atlas)**
- Click **"Try Free"**
- Sign up with email or Google account

### 2. Create Free Cluster
- Choose **"Build a Database"**
- Select **"M0 Sandbox"** (FREE - no credit card needed)
- Cloud Provider: **AWS**
- Region: **Choose closest to you**
- Cluster Name: **`AuthCluster`**
- Click **"Create Cluster"**

### 3. Create Database User
- Username: **`mohit7276`** (or your choice)
- Password: **Use "Autogenerate Secure Password"** 
- **⚠️ SAVE THIS PASSWORD!**
- Privileges: **"Read and write to any database"**
- Click **"Create User"**

### 4. Network Access
- Click **"Add IP Address"**
- **Option A:** Add Current IP (for local development)
- **Option B:** Add `0.0.0.0/0` (for deployment - allows all IPs)
- **✅ Recommended: Add both**

### 5. Get Connection String
- Click **"Connect"** button on your cluster
- Choose **"Connect your application"**
- Driver: **Node.js** (version 4.1+)
- **Copy the connection string**

## 🔗 Your Connection String Format
```
mongodb+srv://mohit7276:<password>@authcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 🔧 Configure Your App

### Replace in `server/.env`:
```env
MONGODB_URI=mongodb+srv://mohit7276:YOUR_ACTUAL_PASSWORD@authcluster.xxxxx.mongodb.net/authapp?retryWrites=true&w=majority
```

**⚠️ Important:**
- Replace `<password>` with your actual password
- Replace `xxxxx` with your cluster identifier
- Add `/authapp` before the `?` to specify database name

## ✅ Test Connection

Run your server to test:
```bash
cd server
npm start
```

Look for: **"MongoDB connected"** in the console.

## 🚀 For Deployment

When deploying to Render/Vercel, use this same connection string in your environment variables.

## 📊 Free Tier Limits
- **Storage:** 512 MB
- **Connections:** 500 concurrent
- **Bandwidth:** No limit
- **Cost:** $0 forever

## 🛠️ Troubleshooting

### Common Issues:

1. **"Network Error"**
   - Add `0.0.0.0/0` to Network Access
   - Check if IP whitelist includes your current IP

2. **"Authentication Failed"**
   - Double-check username and password
   - Ensure password has no special characters that need encoding

3. **"Cannot connect"**
   - Verify cluster is active (takes 1-3 minutes after creation)
   - Check connection string format

### Password with Special Characters:
If your password has special characters, encode them:
- `@` becomes `%40`
- `:` becomes `%3A`
- `/` becomes `%2F`

## 📞 Support
- **MongoDB Docs:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Community:** [community.mongodb.com](https://community.mongodb.com)

## 🎯 Next Steps After Setup
1. ✅ Test local connection
2. ✅ Update environment for deployment
3. ✅ Deploy to Render/Vercel
4. ✅ Your website works 24/7!

---

**💡 Pro Tip:** MongoDB Atlas automatically creates backups and provides monitoring dashboards for your database!
