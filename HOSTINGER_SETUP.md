# 🚀 Hostinger Deployment - Complete Setup Guide

> **This guide automates everything. Just follow these steps!**

---

## 📋 Overview

Your application consists of:
- **Frontend**: React app served from `https://trustlendingfunds.com` (main domain)
- **Backend API**: Node.js server at `https://api.trustlendingfunds.com` (subdomain)
- **Database**: Supabase (already configured)

---

## ✅ Step 1: Prepare Local Files

### Build the Frontend
```bash
npm run build
```
This creates a `dist/` folder with optimized production files.

**Expected output**: `dist/` folder with `index.html` and `assets/` subfolder.

---

## 📤 Step 2: Upload Frontend to Main Domain

### via cPanel File Manager (Easiest)

1. Log in to your Hostinger cPanel
2. Open **Files → File Manager**
3. Navigate to `public_html/` folder
4. **Delete all existing files** in `public_html/`
5. **Upload all files from your local `dist/` folder:**
   - `index.html`
   - `assets/` (entire folder)
   - `.htaccess` (included in your project)

### via FTP (Alternative)

1. Use FileZilla or similar FTP client
2. Connect: `ftp://your-username@ftp.trustlendingfunds.com`
3. Navigate to `public_html/`
4. Upload all files from `dist/` folder

### Verify Frontend
- Visit `https://trustlendingfunds.com`
- Should see the loan application homepage
- All images should load correctly

---

## 🖥️ Step 3: Set Up Backend API Subdomain

### Create Subdomain in cPanel

1. Log in to cPanel
2. Go to **Addon Domains** or **Subdomains**
3. Create new subdomain:
   - **Subdomain name**: `api`
   - **Domain**: `trustlendingfunds.com`
   - **Document Root**: `/home/username/api.trustlendingfunds.com`
   - Click **Create**

### Upload Backend Files

1. In cPanel File Manager, navigate to `/home/username/api.trustlendingfunds.com/`
2. Upload the entire `server/` folder contents:
   ```
   ├── index.js
   ├── emailService.js
   ├── package.json
   ├── .env (production version)
   ├── ecosystem.config.js
   └── setup-production.sh
   ```

---

## ⚙️ Step 4: Install & Start Backend (via SSH)

### Connect via SSH

1. In cPanel, go to **Terminal** (or use SSH client on your computer)
2. Run these commands:

```bash
# Navigate to API directory
cd /home/username/api.trustlendingfunds.com

# Install dependencies
npm install

# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start index.js --name "loan-api"

# Save PM2 configuration
pm2 save

# Set up PM2 to run on startup
pm2 startup

# Verify server is running
pm2 list
```

### Expected Output
```
┌─────┬──────────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ version │ mode    │ status  │ restart  │
├─────┼──────────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ loan-api     │ N/A     │ fork    │ online  │ 0        │
└─────┴──────────────┴─────────┴─────────┴─────────┴──────────┘
```

---

## ✅ Step 5: Verify Everything Works

### Test Frontend
1. Visit `https://trustlendingfunds.com`
2. Verify all pages load
3. Check that CSS and images display correctly

### Test API
1. Visit `https://api.trustlendingfunds.com/health`
2. You should see: `{"status":"ok"}`

### Test Form Submission
1. Go to `https://trustlendingfunds.com/apply`
2. Fill out the loan application form
3. Click **Submit**
4. You should see a success message
5. Check email: `loans@trustlendingfunds.com` for the application

### If Form Submission Fails

**Check API Status:**
```bash
# Via SSH
pm2 list
pm2 logs loan-api
```

**Common Issues:**

| Issue | Solution |
|-------|----------|
| "Failed to fetch" | API server not running. Run `pm2 restart loan-api` |
| CORS error | Backend `.env` missing frontend domain in `ALLOWED_ORIGINS` |
| Email not received | Check SMTP settings in server `.env` |
| Static assets missing | Make sure `.htaccess` is in `public_html/` |

---

## 📊 Monitoring & Maintenance

### View Server Logs
```bash
pm2 logs loan-api
```

### Restart Server
```bash
pm2 restart loan-api
```

### Stop Server
```bash
pm2 stop loan-api
```

### Update Code (after changes)
```bash
cd /home/username/api.trustlendingfunds.com
git pull  # if using git
npm install  # if dependencies changed
pm2 restart loan-api
```

---

## 🔒 Environment Variables

### Frontend (`.env.production`)
Already configured in your project:
```
VITE_SUPABASE_PROJECT_ID=ihkxatmdilgposrsnntk
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=https://ihkxatmdilgposrsnntk.supabase.co
VITE_API_URL=https://api.trustlendingfunds.com
```

### Backend (`.env` in server folder)
Already configured:
```
PORT=80
ALLOWED_ORIGINS=https://trustlendingfunds.com,https://www.trustlendingfunds.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=loans@trustlendingfunds.com
SMTP_PASS=Trustlending_funds1717
RECIPIENT_EMAIL=loans@trustlendingfunds.com
EMAIL_FROM_NAME=Loan Applications
NODE_ENV=production
```

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch" when submitting form
- [ ] Verify API subdomain is created in cPanel
- [ ] Check if backend files are uploaded
- [ ] Run `pm2 list` to see if API is running
- [ ] Check `pm2 logs loan-api` for errors

### Issue: CORS errors in browser console
- [ ] Make sure `ALLOWED_ORIGINS` includes `https://trustlendingfunds.com` in server `.env`
- [ ] Restart backend: `pm2 restart loan-api`

### Issue: Static files (CSS, JS) not loading
- [ ] Verify `.htaccess` is in `public_html/`
- [ ] Hard refresh browser: `Ctrl+Shift+Delete` (clear cache)
- [ ] Then `Ctrl+F5` or `Shift+F5`

### Issue: Emails not being sent
- [ ] Verify SMTP credentials in server `.env`
- [ ] Check email spam folder
- [ ] View logs: `pm2 logs loan-api`

### Issue: API returns 404 for `/health`
- [ ] Verify backend is running: `pm2 list`
- [ ] Check if Node.js is enabled in cPanel
- [ ] Verify domain routing is correct

---

## 📱 Testing Checklist

Before going live, verify:

- [ ] Frontend loads at `https://trustlendingfunds.com`
- [ ] All pages accessible (Home, Apply, About, FAQ, etc.)
- [ ] All images and CSS display correctly
- [ ] API accessible at `https://api.trustlendingfunds.com/health`
- [ ] Form submission works
- [ ] Email received after form submission
- [ ] SSL certificates valid for both domains
- [ ] No console errors (press F12 to check)

---

## 🚀 Going Live

Once verified, your site is ready for production!

### Before Going Live
1. Test on real browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices
3. Verify email delivery
4. Check all links work

### Post-Launch
1. Monitor server logs regularly
2. Set up error tracking (optional)
3. Keep dependencies updated
4. Regular backups

---

## 📞 Support

If you encounter issues:
1. Check the **Troubleshooting** section above
2. View server logs: `pm2 logs loan-api`
3. Check browser console: Press `F12`
4. Verify all `.env` variables are set correctly

---

## 🎯 Quick Commands Reference

```bash
# Connect to server
ssh username@trustlendingfunds.com

# Navigate to backend
cd /home/username/api.trustlendingfunds.com

# View running processes
pm2 list

# View logs
pm2 logs loan-api

# Restart server
pm2 restart loan-api

# Stop server
pm2 stop loan-api

# Start server
pm2 start index.js --name "loan-api"

# Update code and restart
git pull && npm install && pm2 restart loan-api
```

---

**Your site is now ready for deployment! 🎉**
