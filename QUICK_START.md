# 🚀 FINAL DEPLOYMENT GUIDE

> **Everything is prepared. Just follow these visual steps!**

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    trustlendingfunds.com                │
│                  (Main Domain - Frontend)               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  public_html/                                           │
│  ├── index.html                                         │
│  ├── assets/                                            │
│  │   ├── index-XXXXXX.js (476 KB)                      │
│  │   ├── index-XXXXXX.css (68 KB)                      │
│  │   ├── images (all optimized)                        │
│  │   └── ...                                            │
│  └── .htaccess (URL routing)                           │
│                                                         │
│  ✅ Pure static files - no Node.js needed              │
└─────────────────────────────────────────────────────────┘
                          ↓ (HTTP requests)
            ┌─────────────────────────────────┐
            │   Form Submission Request       │
            │   POST /api/loan-application    │
            └─────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              api.trustlendingfunds.com                  │
│              (Subdomain - Node.js API)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  /home/username/api.trustlendingfunds.com/             │
│  ├── index.js (Express server)                         │
│  ├── emailService.js (Nodemailer)                      │
│  ├── package.json                                       │
│  ├── .env (Production config)                          │
│  ├── node_modules/                                      │
│  └── logs/ (PM2 logs)                                   │
│                                                         │
│  Running via: PM2 (Process Manager)                    │
│  Port: 80 (HTTPS)                                      │
│  Auto-restart: Yes ✅                                  │
└─────────────────────────────────────────────────────────┘
                          ↓ (Email via SMTP)
            ┌─────────────────────────────────┐
            │    SMTP Relay (Hostinger)       │
            │    smtp.hostinger.com:465       │
            └─────────────────────────────────┘
                          ↓
            ┌─────────────────────────────────┐
            │   Recipient Email Inbox         │
            │ loans@trustlendingfunds.com     │
            └─────────────────────────────────┘
```

---

## 📁 Folder Structure to Upload

### What You Have Ready

```
Your Local Machine:
complete-web/
├── dist/                          ← UPLOAD THIS
├── server/                        ← UPLOAD THIS
├── DEPLOYMENT_READY.md            ← Read this
├── HOSTINGER_SETUP.md             ← Read this
└── DEPLOYMENT_COMPLETE.md         ← Check this
```

---

## ⚡ THE 5-MINUTE DEPLOYMENT

### 👉 Step 1: Login to Hostinger

1. Visit: `https://www.hostinger.com/`
2. Login with your credentials
3. Click "cPanel" button
4. You're in!

---

### 👉 Step 2: Upload Frontend (3 minutes)

```
cPanel Home
  ↓
File Manager (Files)
  ↓
public_html/
  ↓
DELETE all existing files (if any)
  ↓
UPLOAD these from your local dist/ folder:
  • index.html
  • assets/ (entire folder)
  • .htaccess
  ↓
DONE! ✅
```

**Test**: Visit `https://trustlendingfunds.com/`  
Should see: Homepage with all images loaded

---

### 👉 Step 3: Create API Subdomain (2 minutes)

```
cPanel Home
  ↓
Addon Domains OR Subdomains
  ↓
Create New Subdomain:
  • Name: api
  • Domain: trustlendingfunds.com
  • Document Root: /home/username/api.trustlendingfunds.com
  ↓
Click CREATE
  ↓
DONE! ✅ (May take 5-10 minutes to propagate)
```

---

### 👉 Step 4: Upload Backend (2 minutes)

```
File Manager
  ↓
Navigate to:
  /home/username/api.trustlendingfunds.com/
  ↓
UPLOAD from your local server/ folder:
  • index.js
  • emailService.js
  • package.json
  • .env
  • ecosystem.config.js
  • start.sh
  • start.bat
  ↓
DONE! ✅
```

---

### 👉 Step 5: Run Startup Script (via SSH)

```
cPanel Home
  ↓
Terminal (or use SSH client on your computer)
  ↓
Copy-paste these commands ONE BY ONE:

cd /home/username/api.trustlendingfunds.com
bash start.sh

  ↓
Wait for script to complete
You should see: ✓ All setup steps completed
  ↓
DONE! ✅
```

---

## ✅ Verification (After All Steps)

### Test 1: Frontend
```
Visit: https://trustlendingfunds.com

Expected: Homepage loads with all content visible
If not working: Check dist/ folder was uploaded correctly
```

### Test 2: API Health
```
Visit: https://api.trustlendingfunds.com/health

Expected: {"status":"ok"}
If not working: Run via SSH:
  pm2 logs loan-api
  (Check for error messages)
```

### Test 3: Form Submission
```
Visit: https://trustlendingfunds.com/apply

1. Fill out all fields
2. Click "Submit"
3. Should see: Success message

Check email: loans@trustlendingfunds.com
Should receive: Loan application details
```

---

## 🛠️ If Something Breaks

### Quick Troubleshooting

**"Failed to fetch" error:**
```bash
# Via SSH Terminal in cPanel:
pm2 list                # Check if API is running
pm2 logs loan-api       # View error messages
pm2 restart loan-api    # Restart it
```

**CSS/Images not loading:**
```
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+F5
3. Wait a minute and try again
```

**Email not received:**
```bash
# Via SSH, check logs:
pm2 logs loan-api

# Look for SMTP errors - if found:
# - Verify credentials in server/.env
# - Check spam folder
# - Wait a few minutes
```

---

## 📚 Documentation Files Ready

I've created these files for reference:

| File | Read When | Purpose |
|------|-----------|---------|
| **DEPLOYMENT_READY.md** | First | Quick overview |
| **HOSTINGER_SETUP.md** | During setup | Detailed guide |
| **DEPLOYMENT_COMPLETE.md** | Before uploading | Full checklist |
| **server/start.sh** | On Hostinger | Auto-setup script |
| **server/ecosystem.config.js** | Reference | PM2 config |

---

## 🎯 Summary: What's Ready

### ✅ Frontend
- [x] Built and optimized (`dist/` folder)
- [x] All images compressed
- [x] JavaScript bundled (476 KB)
- [x] CSS optimized (68 KB)
- [x] `.htaccess` configured
- Ready to upload!

### ✅ Backend
- [x] Node.js server ready
- [x] Express configured
- [x] CORS properly set
- [x] Email service configured
- [x] Production `.env` set
- [x] PM2 startup script included
- Ready to upload!

### ✅ Documentation
- [x] Setup guides written
- [x] Troubleshooting included
- [x] Auto-setup scripts ready
- [x] Testing procedures documented

---

## 🚀 Next Steps

1. **Read**: `DEPLOYMENT_READY.md` (2 min)
2. **Follow**: Steps 1-5 above (5 min total)
3. **Test**: Run verification tests (2 min)
4. **Done**: Your site is live! 🎉

---

## 📞 Quick Commands Reference

**After running `bash start.sh`**, you can use these SSH commands anytime:

```bash
# See if server is running
pm2 list

# View recent logs
pm2 logs loan-api

# View logs (real-time)
pm2 logs loan-api --follow

# Restart server
pm2 restart loan-api

# Stop server
pm2 stop loan-api

# Start server (if stopped)
pm2 start index.js --name "loan-api"

# Update server code and restart
cd /home/username/api.trustlendingfunds.com
git pull
npm install
pm2 restart loan-api
```

---

## 🎉 You're All Set!

Everything is prepared. Just upload the files and run the startup script.

**Your live site will be ready in minutes!**

---

### 📖 Need Help?
1. Check `HOSTINGER_SETUP.md` for detailed steps
2. Check `DEPLOYMENT_COMPLETE.md` for checklist
3. View logs: `pm2 logs loan-api` (via SSH)

### 🚀 Ready to Deploy?
**Start with Step 1: Login to Hostinger →**
