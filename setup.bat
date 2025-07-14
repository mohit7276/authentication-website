@echo off
echo 🚀 Setting up Professional Authentication Website...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo ✅ NPM found  
npm --version
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd server
npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Check if .env exists
if not exist "server\.env" (
    echo.
    echo ⚠️  Environment file not found!
    echo 📝 Creating sample .env file...
    
    (
    echo # MongoDB Connection
    echo MONGODB_URI=mongodb://localhost:27017/authapp
    echo.
    echo # JWT Secret ^(Change this to a random string^)
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
    echo.
    echo # Google OAuth ^(Get these from Google Cloud Console^)
    echo GOOGLE_CLIENT_ID=your-google-oauth-client-id
    echo GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
    echo.
    echo # Server Configuration
    echo PORT=5000
    echo NODE_ENV=development
    ) > server\.env
    
    echo ✅ Sample .env file created in server\.env
    echo 🔧 Please update the values in server\.env with your actual credentials
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Make sure MongoDB is running on your system
echo 2. Update server\.env with your actual credentials  
echo 3. Run: npm run start
echo.
echo 🌐 The website will be available at:
echo    Local:   http://localhost:3000
echo    Network: Use 'npm run dev' to see network URLs
echo.
pause
