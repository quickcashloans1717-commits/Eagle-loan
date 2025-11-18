# Hostinger Deployment Guide

## Overview
- **Frontend**: Hosted on main domain (trustlendingfunds.com)
- **Backend API**: Hosted on subdomain (api.trustlendingfunds.com)
- **Database**: Supabase (already configured)

## Frontend Deployment

### 1. Build the Project
```bash
npm run build
```
Creates `dist/` folder with all static files.

### 2. Upload to Hostinger
- Connect via FTP or use cPanel File Manager
- Navigate to `public_html/` 
- Upload all files from `dist/` folder
- Upload `.htaccess` file (for routing)

### 3. Environment Variables (.env.production)
Already configured with:
- `VITE_API_URL=https://api.trustlendingfunds.com`
- `VITE_SUPABASE_URL` and credentials

## Backend API Deployment

### 1. Create API Subdomain
- In cPanel: Addon Domains or Subdomains
- Create: `api.trustlendingfunds.com`
- Point to: `/home/username/api.trustlendingfunds.com`

### 2. Upload Backend Files
Upload to the API subdomain root:
```
api.trustlendingfunds.com/
├── server/
│   ├── index.js
│   ├── emailService.js
│   ├── package.json
│   └── .env (production)
```

### 3. Install Dependencies
SSH into Hostinger:
```bash
cd /home/username/api.trustlendingfunds.com/server
npm install
```

### 4. Start Node.js Server
**Option A: Using PM2 (Recommended)**
```bash
npm install -g pm2
pm2 start index.js --name "loan-api"
pm2 save
pm2 startup
```

**Option B: Using cPanel Node.js App Manager**
1. Go to cPanel → Setup Node.js App
2. Create new app pointing to `/server/index.js`
3. Set up environment variables

### 5. Server .env File (Production)
```
PORT=3001
ALLOWED_ORIGINS=https://trustlendingfunds.com,https://www.trustlendingfunds.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=loans@trustlendingfunds.com
SMTP_PASS=Trustlending_funds1717
RECIPIENT_EMAIL=loans@trustlendingfunds.com
EMAIL_FROM_NAME=Loan Applications
NODE_ENV=production
```

## .htaccess Configuration (Frontend)
Ensures React Router works correctly:
- All requests go to index.html
- Static assets cached with long expiry
- Proper MIME types for JS/CSS

## Testing
1. Visit `https://trustlendingfunds.com`
2. Fill out loan application form
3. Verify API call goes to `https://api.trustlendingfunds.com/api/loan-application`
4. Check email at `loans@trustlendingfunds.com`

## Troubleshooting

### CORS Errors
- Verify `ALLOWED_ORIGINS` in server `.env`
- Ensure frontend domain is listed

### Form Submission Fails
- Check browser Network tab
- Check server logs: `pm2 logs loan-api`
- Verify SMTP credentials are correct

### Static Assets Not Loading
- Check `.htaccess` is uploaded
- Verify `base: './'` in vite.config.ts
- Clear browser cache (hard refresh)

## SSL Certificate
- Hostinger provides free SSL
- Enable AutoSSL in cPanel
- Both main domain and API subdomain should have SSL
