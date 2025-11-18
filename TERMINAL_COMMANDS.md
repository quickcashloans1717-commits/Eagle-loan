# 📋 COPY-PASTE DEPLOYMENT COMMANDS

Use these commands to deploy. Copy and paste them one at a time.

---

## 🔐 SSH Connection

**Step 1: Connect to your Hostinger server via SSH**

```bash
ssh username@trustlendingfunds.com
```

Replace `username` with your actual Hostinger username.

**Alternative**: Use cPanel Terminal instead (easier if you haven't used SSH before)

---

## 📥 Backend Deployment Commands

**Step 2: Copy and paste these commands ONE BY ONE**

### Navigate to API folder
```bash
cd /home/username/api.trustlendingfunds.com
```
Replace `username` with your actual Hostinger username.

### Verify you're in the right folder
```bash
pwd
ls -la
```
Should show: `index.js`, `emailService.js`, `package.json`, `.env`

### Install dependencies
```bash
npm install
```
Wait for this to complete (2-3 minutes).

### Run the startup script
```bash
bash start.sh
```

Wait for this to complete. You should see output like:
```
✓ Dependencies installed
✓ PM2 is available
✓ API server started
✓ Configuration saved
✓ Auto-startup configured
```

---

## ✅ Verify Deployment

### Step 3: Check if server is running

```bash
pm2 list
```

Expected output:
```
┌─────┬──────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name     │ version │ mode    │ status  │ restart  │
├─────┼──────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ loan-api │ N/A     │ fork    │ online  │ 0        │
└─────┴──────────┴─────────┴─────────┴─────────┴──────────┘
```

### Check logs for any errors
```bash
pm2 logs loan-api
```

Press `Ctrl+C` to exit logs.

---

## 🆘 Troubleshooting Commands

### If API isn't running:

```bash
# Restart it
pm2 restart loan-api

# Check status again
pm2 list

# View detailed logs
pm2 logs loan-api --follow
```

### Check Node.js version
```bash
node --version
npm --version
```

### Check if port 80 is accessible
```bash
curl https://api.trustlendingfunds.com/health
```

Should return: `{"status":"ok"}`

---

## 🔄 Update Commands (for future use)

### Pull latest code (if using git)
```bash
cd /home/username/api.trustlendingfunds.com
git pull
npm install
pm2 restart loan-api
```

### Restart server after changes
```bash
pm2 restart loan-api
```

### Stop server
```bash
pm2 stop loan-api
```

### Start server (if stopped)
```bash
cd /home/username/api.trustlendingfunds.com
pm2 start index.js --name "loan-api"
```

### View real-time logs
```bash
pm2 logs loan-api --follow
```

### Monitor server status
```bash
pm2 monit
```

---

## 📊 Useful Information

### View all PM2 processes
```bash
pm2 list
```

### View specific app details
```bash
pm2 info loan-api
```

### Delete app from PM2
```bash
pm2 delete loan-api
```

### Save current PM2 state
```bash
pm2 save
```

### Resurrect PM2 state
```bash
pm2 resurrect
```

### List PM2 startup hooks
```bash
pm2 startup
```

---

## 🐛 Debug Commands

### Full error log
```bash
pm2 logs loan-api
```

### Last 50 lines
```bash
pm2 logs loan-api | tail -50
```

### Filter for errors
```bash
pm2 logs loan-api | grep -i error
```

### Real-time monitoring
```bash
pm2 monit
```

---

## 📁 File Operations

### Check if server files exist
```bash
cd /home/username/api.trustlendingfunds.com
ls -la
```

### Check .env file
```bash
cat .env
```

### Edit .env file (if needed)
```bash
nano .env
# Edit, then press Ctrl+X, Y, Enter to save
```

### Check disk space
```bash
df -h
```

### Check if Node.js is installed
```bash
which node
node --version
npm --version
```

---

## 🌐 Network Commands

### Test DNS resolution
```bash
nslookup api.trustlendingfunds.com
```

### Test connectivity
```bash
curl -I https://api.trustlendingfunds.com/health
```

### Test from local (run on your computer)
```bash
curl https://api.trustlendingfunds.com/health
```

---

## 📝 Full Deployment Sequence

```bash
# 1. Connect to server
ssh username@trustlendingfunds.com

# 2. Go to API folder
cd /home/username/api.trustlendingfunds.com

# 3. Run setup
bash start.sh

# 4. Verify
pm2 list

# 5. Check logs
pm2 logs loan-api

# Done! Press Ctrl+C to exit logs
```

---

## ⚠️ Important Notes

- Replace `username` with your actual Hostinger username
- When using `nano` editor: Press `Ctrl+X`, then `Y`, then `Enter` to save
- Press `Ctrl+C` to stop viewing logs
- Press `Ctrl+Z` if a command seems stuck (last resort)
- All commands should run without errors after `bash start.sh`

---

## 🎯 Success Indicators

After running `bash start.sh`:
- ✅ No error messages
- ✅ `pm2 list` shows "online" status
- ✅ `pm2 logs loan-api` shows recent logs
- ✅ Visit `https://api.trustlendingfunds.com/health` returns `{"status":"ok"}`

---

## 📞 Quick Reference

| What | Command |
|------|---------|
| Connect | `ssh username@trustlendingfunds.com` |
| Setup | `bash start.sh` |
| Status | `pm2 list` |
| Logs | `pm2 logs loan-api` |
| Restart | `pm2 restart loan-api` |
| Stop | `pm2 stop loan-api` |
| Edit .env | `nano .env` |

---

**Ready to deploy? Follow the Full Deployment Sequence above! ✅**
