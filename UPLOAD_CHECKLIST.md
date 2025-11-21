# Quick Upload Checklist - Namecheap

Use this checklist to upload files to `api.eagleloans.site` on Namecheap.

## ✅ Pre-Upload Checklist

- [ ] Have cPanel login credentials
- [ ] Know your cPanel username
- [ ] Have local `server/` folder ready
- [ ] Have `.env` content ready to paste

## 📁 Step 1: Create Subdomain

- [ ] Login to cPanel
- [ ] Go to **"Subdomains"**
- [ ] Create subdomain: `api`
- [ ] Domain: `eagleloans.site`
- [ ] Document Root: `/home/yourusername/api.eagleloans.site`
- [ ] Click **"Create"**
- [ ] Wait 5-10 minutes

## 📂 Step 2: Navigate to Directory

**Method A: File Manager**
- [ ] Open **"File Manager"** in cPanel
- [ ] Go to `/home/yourusername/`
- [ ] Open `api.eagleloans.site/` folder
- [ ] Create `server/` folder (or upload directly to root)

**Method B: FTP**
- [ ] Connect via FTP client (FileZilla, WinSCP)
- [ ] Navigate to `/home/yourusername/api.eagleloans.site/`
- [ ] Create `server/` folder if needed

**Method C: SSH**
- [ ] Connect via SSH: `ssh yourusername@yourdomain.com`
- [ ] Navigate: `cd ~/api.eagleloans.site`

**Method D: Node.js App Manager**
- [ ] Go to **"Setup Node.js App"**
- [ ] Create new application
- [ ] Set Application root: `api.eagleloans.site`
- [ ] Use terminal in app manager

## 📤 Step 3: Upload Files

**Required Files to Upload:**
- [ ] `index.js`
- [ ] `emailService.js`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `.env` (create new file with content below)

**Optional Files:**
- [ ] `ecosystem.namecheap.config.js`
- [ ] `.htaccess`
- [ ] `start.sh`

**Files NOT to Upload:**
- [ ] ❌ `node_modules/` (will install via npm)
- [ ] ❌ `.env.example`
- [ ] ❌ `BACKEND_README.md`

## 📝 Step 4: Create .env File

Create `.env` file with this content:
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

- [ ] File created
- [ ] Content pasted
- [ ] File saved

## ⚙️ Step 5: Install Dependencies

**Via SSH:**
```bash
cd /home/yourusername/api.eagleloans.site/server
npm install --production
```

**Via Node.js App Manager:**
- [ ] Click **"Terminal"** in app manager
- [ ] Run: `npm install --production`

- [ ] Dependencies installed
- [ ] No errors during installation

## 🚀 Step 6: Start Server

**Option A: Using PM2**
```bash
npm install -g pm2
pm2 start index.js --name eagle-loans-api
pm2 save
pm2 startup
```

- [ ] PM2 installed
- [ ] Server started
- [ ] PM2 config saved

**Option B: Using Node.js App Manager**
- [ ] Environment variables set
- [ ] Click **"Run JS script"** or **"Restart App"**

- [ ] Server started

## ✅ Step 7: Test

- [ ] Visit: `https://api.eagleloans.site/health`
- [ ] Returns: `{"status":"ok"}`
- [ ] Visit: `https://api.eagleloans.site/api/test`
- [ ] Returns: `{"message":"API is working correctly"}`

## 🆘 Troubleshooting

If something doesn't work:

- [ ] Check subdomain exists: cPanel → Subdomains
- [ ] Check file permissions: Should be 755 (folders), 644 (files)
- [ ] Check `.env` file exists and has correct values
- [ ] Check server is running: `pm2 list` or Node.js App Manager
- [ ] Check logs: `pm2 logs eagle-loans-api`
- [ ] Verify port 10000 is available

---

## 📍 File Structure After Upload

Your directory should look like:
```
/home/yourusername/api.eagleloans.site/
└── server/
    ├── index.js
    ├── emailService.js
    ├── package.json
    ├── package-lock.json
    ├── .env
    ├── node_modules/        (after npm install)
    └── logs/                (will be created by PM2)
```

OR (if uploading directly to root):
```
/home/yourusername/api.eagleloans.site/
├── index.js
├── emailService.js
├── package.json
├── package-lock.json
├── .env
├── node_modules/        (after npm install)
└── logs/                (will be created by PM2)
```

---

**✅ Complete all checkboxes, then your backend should be running!**

