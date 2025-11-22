# Vercel Quick Start Guide

## Quick Deploy (5 Minutes)

### Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select `quickcashloans1717-commits/Eagle-loan`
4. Click **"Import"**

### Step 3: Add Environment Variables
In Vercel project settings, add these:

**Frontend:**
- `VITE_SUPABASE_URL` = your_supabase_url
- `VITE_SUPABASE_PUBLISHABLE_KEY` = your_supabase_key

**Backend (for email):**
- `SMTP_HOST` = mail.eagleloans.site
- `SMTP_PORT` = 465
- `SMTP_USER` = company@eagleloans.site
- `SMTP_PASS` = your_password
- `RECIPIENT_EMAIL` = company@eagleloans.site
- `EMAIL_FROM_NAME` = Eagle Loans Applications
- `EMAIL_ENABLED` = true

### Step 4: Deploy
Click **"Deploy"** and wait ~2 minutes!

### Step 5: Test
Visit your deployment URL and test:
- `https://your-app.vercel.app` - Frontend
- `https://your-app.vercel.app/api/health` - API Health Check

## That's It! 🎉

Your app is now live on Vercel!

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

