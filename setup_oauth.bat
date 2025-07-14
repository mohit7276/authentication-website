@echo off
echo.
echo ================================
echo   Google OAuth Setup Helper
echo ================================
echo.
echo 1. Get your credentials from Google Cloud Console
echo 2. Copy your Client ID and Client Secret
echo 3. Edit server/.env file and replace:
echo.
echo    GOOGLE_CLIENT_ID=your-actual-client-id-here
echo    GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
echo.
echo 4. Restart the backend server
echo.
echo Current .env status:
type "server\.env" | findstr GOOGLE
echo.
echo Press any key to open the .env file for editing...
pause > nul
notepad "server\.env"
