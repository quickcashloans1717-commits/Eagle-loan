#!/bin/bash
# Namecheap Deployment Script for Backend
# Usage: ./deploy-namecheap.sh

set -e

echo "🚀 Starting Namecheap Deployment..."

# Configuration (Update these variables)
CPANEL_USER="yourusername"
DOMAIN="eagleloans.site"
API_SUBDOMAIN="api.eagleloans.site"
SERVER_DIR="/home/$CPANEL_USER/$API_SUBDOMAIN/server"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  Please update CPANEL_USER variable in this script with your cPanel username${NC}"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Navigate to server directory
echo -e "${GREEN}📁 Navigating to server directory...${NC}"
cd "$SERVER_DIR" || exit 1

# Pull latest changes from GitHub
echo -e "${GREEN}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

# Install dependencies
echo -e "${GREEN}📦 Installing dependencies...${NC}"
npm install --production

# Create logs directory if it doesn't exist
echo -e "${GREEN}📝 Creating logs directory...${NC}"
mkdir -p logs

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Please create .env file with production configuration."
    exit 1
fi

# Restart PM2 process
echo -e "${GREEN}🔄 Restarting server with PM2...${NC}"
pm2 restart eagle-loans-api || pm2 start index.js --name eagle-loans-api

# Save PM2 configuration
echo -e "${GREEN}💾 Saving PM2 configuration...${NC}"
pm2 save

# Show status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}📊 Server status:${NC}"
pm2 status
pm2 logs eagle-loans-api --lines 20

echo -e "${GREEN}🎉 Deployment successful!${NC}"

