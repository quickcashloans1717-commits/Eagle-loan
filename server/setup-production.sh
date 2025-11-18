#!/bin/bash

# Production Setup Script for Loan API Server
# Run this on Hostinger via SSH

echo "========================================="
echo "Loan API Server - Production Setup"
echo "========================================="

# Navigate to API directory
API_DIR="/home/username/api.trustlendingfunds.com"
cd $API_DIR || exit 1

echo ""
echo "1️⃣ Installing Node.js dependencies..."
npm install

echo ""
echo "2️⃣ Creating logs directory..."
mkdir -p logs

echo ""
echo "3️⃣ Installing PM2 globally..."
npm install -g pm2

echo ""
echo "4️⃣ Stopping any existing PM2 apps..."
pm2 stop loan-api 2>/dev/null || true

echo ""
echo "5️⃣ Starting API server with PM2..."
pm2 start index.js --name "loan-api" --env production

echo ""
echo "6️⃣ Saving PM2 configuration..."
pm2 save

echo ""
echo "7️⃣ Setting up PM2 startup..."
pm2 startup

echo ""
echo "✅ Setup complete!"
echo ""
echo "Verify server is running:"
echo "  pm2 list"
echo ""
echo "View logs:"
echo "  pm2 logs loan-api"
echo ""
echo "Monitor in real-time:"
echo "  pm2 monit"
