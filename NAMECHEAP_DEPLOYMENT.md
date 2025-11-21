# Namecheap Deployment Guide - Eagle Loans

Complete guide to deploy Eagle Loans application on Namecheap hosting with cPanel.

## Prerequisites

- Namecheap cPanel access
- Domain: `eagleloans.site` (already configured)
- Email account: `company@eagleloans.site`
- SSH access (recommended) or cPanel File Manager

---

## 📋 Overview

- **Frontend**: Main domain (`https://eagleloans.site` or `https://www.eagleloans.site`)
- **Backend API**: Subdomain (`https://api.eagleloans.site`)
- **Email**: `company@eagleloans.site`

---

## 🔧 Step 1: Backend API Deployment

### 1.1 Create API Subdomain

1. **Login to cPanel**
2. Go to **"Subdomains"** or **"Addon Domains"**
3. Create subdomain: `api`
   - **Domain**: `eagleloans.site`
   - **Subdomain**: `api`
   - **Document Root**: `/home/yourusername/api.eagleloans.site`
   - Click **"Create"**

### 1.2 Upload Backend Files

**Via SSH (Recommended):**
```bash
# Connect via SSH
ssh yourusername@yourdomain.com

# Navigate to API subdomain directory
cd /home/yourusername/api.eagleloans.site

# Clone your repository or upload files
git clone https://github.com/quickcashloans1717-commits/Eagle-loan.git .
# OR upload via FTP/SFTP

# Navigate to server directory
cd server
```

**Via cPanel File Manager:**
1. Go to **File Manager**
2. Navigate to `/api.eagleloans.site/`
3. Upload all files from `server/` directory
4. Upload structure:
   ```
   api.eagleloans.site/
   ├── index.js
   ├── emailService.js
   ├── package.json
   ├── package-lock.json
   └── .env (create this)
   ```

### 1.3 Install Dependencies

**Via SSH:**
```bash
cd /home/yourusername/api.eagleloans.site/server
npm install --production
```

**Via cPanel Node.js App Manager:**
1. Go to **Setup Node.js App**
2. Click **"Create Application"**
3. Configure:
   - **Node.js version**: 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: `server`
   - **Application URL**: `api.eagleloans.site`
   - **Application startup file**: `index.js`
4. Click **"Create"**

### 1.4 Create Production .env File

Create `.env` file in `/home/yourusername/api.eagleloans.site/server/`:

```env
PORT=10000
NODE_ENV=production
EMAIL_ENABLED=true

# Production CORS - Update with your actual domain
ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site,https://api.eagleloans.site

# Eagle Loans Email Configuration
SMTP_HOST=mail.eagleloans.site
SMTP_PORT=465
SMTP_USER=company@eagleloans.site
SMTP_PASS=6HCgUubyuBKLHQa
RECIPIENT_EMAIL=company@eagleloans.site
EMAIL_FROM_NAME=Eagle Loans Applications
```

⚠️ **Important**: 
- Replace `yourusername` with your actual cPanel username
- Verify SMTP credentials
- Ensure port 10000 is available (or change if needed)

### 1.5 Start Backend Server

**Option A: Using PM2 (Recommended)**

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to server directory
cd /home/yourusername/api.eagleloans.site/server

# Start server with PM2
pm2 start index.js --name "eagle-loans-api"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
# Follow the instructions displayed

# Check status
pm2 status
pm2 logs eagle-loans-api
```

**Option B: Using cPanel Node.js App Manager**

1. Go to **Setup Node.js App**
2. Find your application (`api.eagleloans.site`)
3. Click **"⚙️ Settings"**
4. Add environment variables (click **"Add Variable"** for each):
   ```
   PORT=10000
   NODE_ENV=production
   EMAIL_ENABLED=true
   ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site
   SMTP_HOST=mail.eagleloans.site
   SMTP_PORT=465
   SMTP_USER=company@eagleloans.site
   SMTP_PASS=6HCgUubyuBKLHQa
   RECIPIENT_EMAIL=company@eagleloans.site
   EMAIL_FROM_NAME=Eagle Loans Applications
   ```
5. Click **"Run JS script"** or **"Restart App"**

### 1.6 Configure Reverse Proxy (if needed)

If using Node.js App Manager, it may handle routing automatically. Otherwise, create `.htaccess` in `/api.eagleloans.site/`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:10000/$1 [P,L]
```

### 1.7 Test Backend

Visit in browser:
- Health Check: `https://api.eagleloans.site/health`
- Test Endpoint: `https://api.eagleloans.site/api/test`

Should return JSON responses.

---

## 🎨 Step 2: Frontend Deployment

### 2.1 Build Frontend

**Local Machine:**
```bash
# In project root
npm install
npm run build

# Creates dist/ folder with production files
```

### 2.2 Upload Frontend Files

**Via SSH/SFTP:**
```bash
# Upload all contents of dist/ folder to public_html/
cd dist
# Upload via SFTP to: /home/yourusername/public_html/
```

**Via cPanel File Manager:**
1. Go to **File Manager**
2. Navigate to `public_html/`
3. Upload all files from `dist/` folder
4. **Important**: Upload `.htaccess` file (see below)

### 2.3 Create .htaccess File

Create `.htaccess` in `/home/yourusername/public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle Angular/React Router
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Enable Gzip Compression
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
  </IfModule>
  
  # Browser Caching
  <IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
  </IfModule>
  
  # Security Headers
  <IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
  </IfModule>
</IfModule>
```

### 2.4 Configure Frontend Environment Variables

Since Vite builds static files, environment variables must be set at build time.

**Build with production API URL:**
```bash
# Create .env.production file in project root
echo "VITE_API_URL=https://api.eagleloans.site" > .env.production

# Build frontend
npm run build
```

Or update `vite.config.ts` to use production URL by default in production mode.

---

## 🔗 Step 3: Connect Frontend to Backend

### 3.1 Verify Backend CORS

Ensure backend `.env` includes frontend domain:
```env
ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site,https://api.eagleloans.site
```

### 3.2 Update Frontend Build

Rebuild frontend with correct API URL:
```bash
VITE_API_URL=https://api.eagleloans.site npm run build
```

Upload updated `dist/` folder to `public_html/`.

---

## ✅ Step 4: Testing

### 4.1 Test Backend
- ✅ `https://api.eagleloans.site/health` → Should return `{"status":"ok"}`
- ✅ `https://api.eagleloans.site/api/test` → Should return test message

### 4.2 Test Frontend
- ✅ `https://eagleloans.site` → Should load homepage
- ✅ `https://www.eagleloans.site` → Should redirect or load
- ✅ All pages should work (About, Contact, Apply Loan, etc.)

### 4.3 Test Loan Application
1. Visit `https://eagleloans.site/apply-loan`
2. Fill out loan application form
3. Submit application
4. Check browser console for errors
5. Verify email is received at `company@eagleloans.site`

---

## 🔧 Troubleshooting

### Backend Not Starting
- Check PM2 logs: `pm2 logs eagle-loans-api`
- Verify port is not in use: `netstat -tulpn | grep 10000`
- Check Node.js version: `node -v` (should be 18+ or 20+)
- Verify `.env` file exists and has correct values

### CORS Errors
- Verify `ALLOWED_ORIGINS` in backend `.env` includes frontend domain
- Check browser console for exact error
- Restart backend server after changing `.env`

### Frontend Not Loading
- Verify `.htaccess` file exists in `public_html/`
- Check file permissions (should be 644 for files, 755 for directories)
- Clear browser cache
- Check browser console for errors

### Email Not Sending
- Verify SMTP credentials in backend `.env`
- Check email server logs via cPanel → Email Accounts
- Test SMTP connection manually
- Check backend logs for email errors

---

## 📊 Monitoring

### PM2 Monitoring
```bash
# View logs
pm2 logs eagle-loans-api

# Monitor resources
pm2 monit

# Check status
pm2 status

# Restart server
pm2 restart eagle-loans-api

# Stop server
pm2 stop eagle-loans-api
```

### cPanel Node.js App Manager
- View logs in cPanel → Setup Node.js App → Your App → Logs
- Restart app from the app settings

---

## 🔄 Updates & Maintenance

### Update Backend
```bash
cd /home/yourusername/api.eagleloans.site/server
git pull origin main
npm install --production
pm2 restart eagle-loans-api
```

### Update Frontend
```bash
# On local machine
git pull origin main
npm install
VITE_API_URL=https://api.eagleloans.site npm run build

# Upload dist/ contents to public_html/
```

---

## 🔒 Security Checklist

- ✅ Use HTTPS (SSL certificates)
- ✅ Keep dependencies updated
- ✅ Use environment variables for sensitive data
- ✅ Don't commit `.env` files to Git
- ✅ Use strong email passwords
- ✅ Enable security headers in `.htaccess`
- ✅ Regular backups via cPanel

---

## 📞 Support

If you encounter issues:
1. Check server logs (PM2 or cPanel)
2. Verify all environment variables
3. Test endpoints individually
4. Check cPanel error logs

---

## ✨ Quick Reference

**Backend URL**: `https://api.eagleloans.site`  
**Frontend URL**: `https://eagleloans.site`  
**Email**: `company@eagleloans.site`  
**Backend Directory**: `/home/yourusername/api.eagleloans.site/server`  
**Frontend Directory**: `/home/yourusername/public_html/`

---

**Last Updated**: November 2024

