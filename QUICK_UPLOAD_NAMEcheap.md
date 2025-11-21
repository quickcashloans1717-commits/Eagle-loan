# Quick Start - Upload to Namecheap (Simplified)

## 🎯 The Problem You're Facing

You need to upload files to `api.eagleloans.site` directory but can't. Here are the EASIEST ways:

---

## ✅ EASIEST METHOD: Use cPanel Node.js App Manager

This is the **SIMPLEST** method - Namecheap handles everything for you!

### Step 1: Create Node.js App in cPanel

1. Login to cPanel
2. Find **"Setup Node.js App"** (in Software section)
3. Click **"Create Application"**
4. Fill in:
   - **Node.js version**: Select 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: Type `api.eagleloans.site` (or leave default)
   - **Application URL**: Select `api.eagleloans.site` from dropdown
   - **Application startup file**: Type `index.js`
5. Click **"Create"**

### Step 2: Upload Files via App Manager

1. After creating app, you'll see your app listed
2. Click on your app name
3. You'll see options:
   - **"Terminal"** - Command line access
   - **"File Manager"** - Upload files directly
   - **"Settings"** - Configure environment variables

4. **Upload Files:**
   - Click **"File Manager"** or **"Terminal"**
   - Upload these files:
     - `index.js`
     - `emailService.js`
     - `package.json`
     - `package-lock.json`

### Step 3: Set Environment Variables

1. In Node.js App Manager, click **"⚙️ Settings"**
2. Click **"Environment Variables"**
3. Click **"Add Variable"** for each:

```
Variable Name: PORT
Value: 10000

Variable Name: NODE_ENV
Value: production

Variable Name: EMAIL_ENABLED
Value: true

Variable Name: ALLOWED_ORIGINS
Value: https://eagleloans.site,https://www.eagleloans.site,https://api.eagleloans.site

Variable Name: SMTP_HOST
Value: mail.eagleloans.site

Variable Name: SMTP_PORT
Value: 465

Variable Name: SMTP_USER
Value: company@eagleloans.site

Variable Name: SMTP_PASS
Value: 6HCgUubyuBKLHQa

Variable Name: RECIPIENT_EMAIL
Value: company@eagleloans.site

Variable Name: EMAIL_FROM_NAME
Value: Eagle Loans Applications
```

4. Click **"Save"** after each variable

### Step 4: Install Dependencies

1. Click **"Terminal"** in Node.js App Manager
2. Run:
   ```bash
   npm install --production
   ```

### Step 5: Start App

1. In Node.js App Manager, click **"Run JS script"**
2. Or click **"Restart App"**

### Step 6: Test

Visit: `https://api.eagleloans.site/health`
Should return: `{"status":"ok"}`

**✅ Done! This method avoids all upload issues!**

---

## 🔄 ALTERNATIVE METHOD: Use FileZilla (FTP)

If Node.js App Manager doesn't work, use FTP:

### Step 1: Download FileZilla

- Go to: https://filezilla-project.org/download.php
- Download and install

### Step 2: Get FTP Credentials

1. In cPanel → **"FTP Accounts"**
2. Find your main FTP account
3. Note:
   - **Host**: Usually `ftp.eagleloans.site` or `eagleloans.site`
   - **Username**: Your cPanel username
   - **Password**: Your FTP password (or reset it)

### Step 3: Connect

1. Open FileZilla
2. Enter:
   - **Host**: `ftp.eagleloans.site`
   - **Username**: Your username
   - **Password**: Your password
   - **Port**: 21
3. Click **"Quickconnect"**

### Step 4: Navigate and Upload

1. **Right panel (Remote):**
   - Navigate to: `/home/yourusername/api.eagleloans.site/`
   - Create `server/` folder if it doesn't exist:
     - Right-click → **"Create directory"** → Name: `server`
   
2. **Left panel (Local):**
   - Navigate to your local `server/` folder

3. **Upload:**
   - Select all files in local `server/` folder
   - Drag to right panel `server/` folder
   - Wait for upload to complete

4. **Create .env file:**
   - Right-click in remote `server/` folder → **"Create file"**
   - Name: `.env`
   - Right-click → **"View/Edit"**
   - Paste content (see below)
   - Save and close

### Step 5: Install Dependencies

If you have SSH access:
```bash
ssh yourusername@eagleloans.site
cd ~/api.eagleloans.site/server
npm install --production
pm2 start index.js --name eagle-loans-api
pm2 save
```

---

## 📝 .env File Content

Create `.env` file in the same directory as `index.js`:

```env
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

---

## 🔍 Check What You Need

**Files to upload:**
- ✅ `index.js`
- ✅ `emailService.js`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `.env` (create new file)

**Where to upload:**
- Directory: `/home/yourusername/api.eagleloans.site/server/`
- OR directly to: `/home/yourusername/api.eagleloans.site/` (without server folder)

---

## 🆘 Still Stuck?

**Try this:**
1. Contact Namecheap support to enable Node.js App Manager
2. Ask them to create the subdomain for you
3. Ask them where to upload files for `api.eagleloans.site`

**Or use SSH:**
```bash
ssh yourusername@eagleloans.site
cd ~
mkdir -p api.eagleloans.site/server
cd api.eagleloans.site/server
git clone https://github.com/quickcashloans1717-commits/Eagle-loan.git .
cd server
npm install --production
cp env.example .env
nano .env  # Edit and save (Ctrl+X, Y, Enter)
pm2 start index.js --name eagle-loans-api
pm2 save
```

---

## ✅ Success Checklist

After uploading, check:
- [ ] Files are in correct location
- [ ] `.env` file exists with correct content
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (PM2 or Node.js App Manager)
- [ ] Test: `https://api.eagleloans.site/health` returns `{"status":"ok"}`

---

**💡 Tip: The Node.js App Manager method is easiest - it handles everything automatically!**

