#!/bin/bash

echo "🚀 Setting up Professional Authentication Website..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ NPM found: $(npm --version)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo ""
    echo "⚠️  Environment file not found!"
    echo "📝 Creating sample .env file..."
    
    cat > server/.env << EOL
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/authapp

# JWT Secret (Change this to a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google OAuth (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Server Configuration
PORT=5000
NODE_ENV=development
EOL

    echo "✅ Sample .env file created in server/.env"
    echo "🔧 Please update the values in server/.env with your actual credentials"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running on your system"
echo "2. Update server/.env with your actual credentials"
echo "3. Run: npm run start"
echo ""
echo "🌐 The website will be available at:"
echo "   Local:   http://localhost:3000"
echo "   Network: Use 'npm run dev' to see network URLs"
echo ""
