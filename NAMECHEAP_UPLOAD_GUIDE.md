# Namecheap Upload Guide - Step by Step

Complete guide to upload backend files to `api.eagleloans.site` on Namecheap.

---

## 🎯 Understanding the Problem

If you can't upload files to `api.eagleloans.site`, it might be because:
1. The subdomain doesn't exist yet
2. File Manager permissions issue
3. Wrong directory path
4. Need to use SSH/FTP instead

---

## ✅ Method 1: Using cPanel File Manager (Recommended for Beginners)

### Step 1: Create the Subdomain First

1. **Login to cPanel**
   - Go to your Namecheap account
   - Click **"cPanel"** or access via `https://yourdomain.com/cpanel`

2. **Create Subdomain**
   - In cPanel, find **"Subdomains"** section
   - Click **"Subdomains"**
   - **Subdomain**: Type `api`
   - **Domain**: Select `eagleloans.site` from dropdown
   - **Document Root**: Should auto-fill as `/home/yourusername/api.eagleloans.site`
   - Click **"Create"**

3. **Wait for Creation**
   - Wait 5-10 minutes for subdomain to be created
   - You'll see confirmation: "The subdomain has been added"

### Step 2: Navigate to Subdomain Directory

1. **Open File Manager**
   - In cPanel, find **"Files"** section
   - Click **"File Manager"**

2. **Go to Subdomain Directory**
   - In left sidebar, click on your home directory (`/home/yourusername/`)
   - You should see a folder named `api.eagleloans.site/`
   - Click on it to enter

3. **Check Current Contents**
   - You should see a folder structure like:
     ```
     api.eagleloans.site/
     ├── public_html/
     └── (possibly other files)
     ```

### Step 3: Upload Files

**Option A: Upload Directly to Root**

1. **Stay in `api.eagleloans.site/` directory**
   - Don't go into `public_html/` - stay at the root level

2. **Create `server` Folder** (if it doesn't exist)
   - Click **"+ Folder"** button
   - Name it: `server`
   - Click **"Create New Folder"**

3. **Enter `server` Folder**
   - Double-click `server` folder to enter it

4. **Upload Files**
   - Click **"Upload"** button (top toolbar)
   - In upload window, click **"Select File"**
   - Select these files from your local `server/` folder:
     - ✅ `index.js`
     - ✅ `emailService.js`
     - ✅ `package.json`
     - ✅ `package-lock.json`
     - ✅ `ecosystem.namecheap.config.js`
     - ✅ `.htaccess` (from server folder - might need to rename)
   - Click **"Upload"** and wait for completion

5. **Create .env File**
   - In File Manager, click **"+ File"** button
   - Name it: `.env`
   - Click **"Create New File"**
   - Right-click `.env` → **"Edit"**
   - Copy content from `env.example` (see below)
   - Paste and save

**Option B: Upload to Root Level (Without server folder)**

1. **Stay in `api.eagleloans.site/` root**
   - Don't create a `server` folder
   - Upload files directly here

2. **Upload Files Directly**
   - Click **"Upload"** button
   - Upload all files from `server/` folder:
     - `index.js`
     - `emailService.js`
     - `package.json`
     - `package-lock.json`
     - `ecosystem.namecheap.config.js`

3. **Create .env File**
   - Create `.env` file in root of `api.eagleloans.site/`

---

## 🔧 Method 2: Using FTP/SFTP Client (FileZilla, WinSCP, etc.)

### Step 1: Get FTP Credentials

1. **In cPanel**
   - Go to **"FTP Accounts"**
   - Find your main FTP account or create a new one
   - Note down:
     - **Host**: `ftp.eagleloans.site` or `your-domain.com`
     - **Username**: Usually your cPanel username
     - **Password**: Your FTP password
     - **Port**: 21 (FTP) or 22 (SFTP)

### Step 2: Connect with FTP Client

1. **Download FileZilla** (if you don't have it)
   - https://filezilla-project.org/

2. **Connect**
   - Open FileZilla
   - Enter:
     - **Host**: `ftp.eagleloans.site`
     - **Username**: `yourusername`
     - **Password**: `yourpassword`
     - **Port**: 21
   - Click **"Quickconnect"**

3. **Navigate to Subdomain**
   - In right panel (Remote site), navigate to:
     `/home/yourusername/api.eagleloans.site/`

4. **Upload Files**
   - In left panel (Local site), navigate to your local `server/` folder
   - Select all files in `server/` folder
   - Drag and drop to right panel
   - Wait for upload to complete

---

## 💻 Method 3: Using SSH (Terminal/Command Line)

### Step 1: Enable SSH Access

1. **In cPanel**
   - Check if SSH is enabled in your hosting plan
   - Go to **"SSH Access"** (if available)
   - Note your SSH credentials

### Step 2: Connect via SSH

**On Windows (PowerShell or Git Bash):**
```bash
ssh yourusername@yourdomain.com
```

**On Mac/Linux:**
```bash
ssh yourusername@yourdomain.com
```

### Step 3: Navigate and Clone

```bash
# Navigate to your home directory
cd ~

# Navigate to API subdomain directory
cd api.eagleloans.site

# Clone your repository
git clone https://github.com/quickcashloans1717-commits/Eagle-loan.git .

# Navigate to server directory
cd server

# Install dependencies
npm install --production
```

---

## 🎯 Method 4: Using cPanel Node.js App Manager (Easiest Method)

### Step 1: Setup Node.js App

1. **In cPanel**
   - Find **"Setup Node.js App"**
   - Click on it

2. **Create New Application**
   - Click **"Create Application"** button

3. **Configure Application**
   - **Node.js version**: Select 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: Type `api.eagleloans.site`
   - **Application URL**: Select `api.eagleloans.site` from dropdown
   - **Application startup file**: Type `index.js`
   - Click **"Create"**

4. **Upload Files via App Manager**
   - After creating app, you'll see a **"Terminal"** or **"File Manager"** option
   - Use this to upload files directly to the app directory

5. **Set Environment Variables**
   - In Node.js App Manager, find your app
   - Click **"⚙️ Settings"**
   - Click **"Environment Variables"**
   - Add each variable:
     ```
     PORT=10000
     NODE_ENV=production
     EMAIL_ENABLED=true
     ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site,https://api.eagleloans.site
     SMTP_HOST=mail.eagleloans.site
     SMTP_PORT=465
     SMTP_USER=company@eagleloans.site
     SMTP_PASS=6HCgUubyuBKLHQa
     RECIPIENT_EMAIL=company@eagleloans.site
     EMAIL_FROM_NAME=Eagle Loans Applications
     ```
   - Click **"Save"** after each variable

6. **Install Dependencies**
   - In Node.js App Manager, click **"Terminal"**
   - Run:
     ```bash
     npm install --production
     ```

7. **Start Application**
   - In Node.js App Manager, click **"Run JS script"**
   - Or click **"Restart App"**

---

## 📋 Essential Files to Upload

### Required Files:
```
api.eagleloans.site/  (or api.eagleloans.site/server/)
├── index.js                    ✅ REQUIRED
├── emailService.js             ✅ REQUIRED
├── package.json                ✅ REQUIRED
├── package-lock.json           ✅ REQUIRED (for exact versions)
├── .env                        ✅ REQUIRED (create this)
└── .htaccess                   ✅ OPTIONAL (for routing)
```

### Optional Files:
- `ecosystem.namecheap.config.js` (for PM2)
- `setup-production.sh` (for automated setup)
- `start.sh` (startup script)

### Files NOT to Upload:
- ❌ `node_modules/` (will be installed via npm)
- ❌ `.env.example` (not needed in production)
- ❌ `BACKEND_README.md` (documentation only)

---

## 📝 Create .env File Content

Copy this into your `.env` file:

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

---

## 🔍 Troubleshooting Upload Issues

### Issue 1: "Subdomain doesn't exist"
**Solution:**
- Create subdomain first in cPanel → Subdomains
- Wait 5-10 minutes after creation
- Refresh File Manager

### Issue 2: "Permission Denied"
**Solution:**
- Check file permissions in File Manager
- Right-click folder → **"Change Permissions"**
- Set to `755` for folders, `644` for files

### Issue 3: "Can't find api.eagleloans.site folder"
**Solution:**
- Make sure subdomain was created successfully
- Check in File Manager root directory (`/home/yourusername/`)
- Folder name should be exactly `api.eagleloans.site`

### Issue 4: "Files uploaded but can't access"
**Solution:**
- Verify files are in correct location
- Check file permissions
- Ensure `.env` file exists
- Check Node.js App Manager if using it

### Issue 5: "Upload timeout or files too large"
**Solution:**
- Use FTP client instead of File Manager
- Upload files one by one
- Use SSH with `git clone` method

---

## ✅ After Upload - Next Steps

1. **Install Dependencies** (via SSH or Node.js App Manager Terminal):
   ```bash
   cd /home/yourusername/api.eagleloans.site/server
   npm install --production
   ```

2. **Start Server** (choose one method):

   **Using PM2:**
   ```bash
   npm install -g pm2
   pm2 start index.js --name eagle-loans-api
   pm2 save
   ```

   **Using Node.js App Manager:**
   - Click "Run JS script" in cPanel

3. **Test Backend:**
   - Visit: `https://api.eagleloans.site/health`
   - Should return: `{"status":"ok"}`

---

## 🆘 Still Having Issues?

**Check these:**
1. ✅ Subdomain exists in cPanel → Subdomains
2. ✅ Files are in correct directory
3. ✅ `.env` file exists and has correct values
4. ✅ Dependencies installed (`npm install`)
5. ✅ Server is running (check PM2 or Node.js App Manager)
6. ✅ Port 10000 is available (or change in `.env`)

**Contact Support:**
- Namecheap Support: https://www.namecheap.com/support/
- Check cPanel error logs
- Check Node.js App Manager logs

---

## 📞 Quick Reference

**Directory Path**: `/home/yourusername/api.eagleloans.site/server/`  
**Files Needed**: `index.js`, `emailService.js`, `package.json`, `package-lock.json`, `.env`  
**Test URL**: `https://api.eagleloans.site/health`  
**Email**: `company@eagleloans.site`

---

**Last Updated**: November 2024

