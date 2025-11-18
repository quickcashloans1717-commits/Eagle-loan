#!/bin/bash

# ======================================================
# Loan API - Production Startup Script
# Run this once after uploading to Hostinger
# ======================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║     Loan Application API - Production Setup        ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo -e "${BLUE}Working directory: $SCRIPT_DIR${NC}"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}1️⃣  Installing Node.js dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Create logs directory
echo -e "${YELLOW}2️⃣  Creating logs directory...${NC}"
mkdir -p logs
echo -e "${GREEN}✓ Logs directory created${NC}"
echo ""

# Step 3: Check if PM2 is installed
echo -e "${YELLOW}3️⃣  Checking PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi
echo -e "${GREEN}✓ PM2 is available${NC}"
echo ""

# Step 4: Stop existing app if running
echo -e "${YELLOW}4️⃣  Stopping existing app (if running)...${NC}"
pm2 stop loan-api 2>/dev/null || echo "No existing app to stop"
pm2 delete loan-api 2>/dev/null || echo "No app to delete"
sleep 2
echo -e "${GREEN}✓ Cleaned up existing processes${NC}"
echo ""

# Step 5: Start with PM2
echo -e "${YELLOW}5️⃣  Starting API server with PM2...${NC}"
pm2 start index.js --name "loan-api" --env production
sleep 2
echo -e "${GREEN}✓ API server started${NC}"
echo ""

# Step 6: Save PM2 configuration
echo -e "${YELLOW}6️⃣  Saving PM2 configuration...${NC}"
pm2 save
echo -e "${GREEN}✓ Configuration saved${NC}"
echo ""

# Step 7: Setup PM2 startup
echo -e "${YELLOW}7️⃣  Setting up PM2 auto-startup...${NC}"
pm2 startup > /dev/null 2>&1
echo -e "${GREEN}✓ Auto-startup configured${NC}"
echo ""

# Step 8: Show status
echo -e "${YELLOW}8️⃣  Checking server status...${NC}"
echo ""
pm2 list
echo ""

# Display test information
echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║             Setup Complete! ✅                     ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo "🔗 Test the API:"
echo "   curl https://api.trustlendingfunds.com/health"
echo ""
echo "📊 Monitor logs:"
echo "   pm2 logs loan-api"
echo ""
echo "📋 List processes:"
echo "   pm2 list"
echo ""
echo "🔄 Restart API:"
echo "   pm2 restart loan-api"
echo ""
echo "⏹️  Stop API:"
echo "   pm2 stop loan-api"
echo ""
