# ✅ Step-by-Step Deployment Checklist

Follow this checklist in order to deploy your Eagle Loans application to Render.

---

## 📦 Preparation Phase

### Step 1: Prepare Repository
- [ ] Code is committed to Git
- [ ] Code is pushed to GitHub
- [ ] Repository is accessible (public or Render has access)

### Step 2: Gather Information
- [ ] Namecheap email password ready: `company@eagleloans.site`
- [ ] Render account created (sign up at render.com)
- [ ] GitHub account connected to Render

---

## 🖥️ Backend Deployment

### Step 3: Create Backend Service
- [ ] Go to Render Dashboard
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect GitHub repository
- [ ] Select `eagle-loan` repository

### Step 4: Configure Backend
- [ ] **Name**: `eagle-loans-backend`
- [ ] **Environment**: `Node`
- [ ] **Region**: Select closest region
- [ ] **Branch**: `main` (or your default branch)
- [ ] **Root Directory**: `server`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`

### Step 5: Set Backend Environment Variables
Add these in **"Advanced"** → **"Add Environment Variable"**:

- [ ] `PORT` = `10000`
- [ ] `NODE_ENV` = `production`
- [ ] `ALLOWED_ORIGINS` = `https://eagleloans.site,https://www.eagleloans.site`
  - ⚠️ Update this after frontend is deployed with actual URLs
- [ ] `SMTP_HOST` = `mail.eagleloans.site`
- [ ] `SMTP_PORT` = `465`
- [ ] `SMTP_USER` = `company@eagleloans.site`
- [ ] `SMTP_PASS` = `[YOUR_EMAIL_PASSWORD]`
  - ⚠️ Replace with your actual email password
- [ ] `RECIPIENT_EMAIL` = `company@eagleloans.site`
- [ ] `EMAIL_FROM_NAME` = `Eagle Loans Applications`

### Step 6: Deploy Backend
- [ ] Click **"Create Web Service"**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy backend URL (e.g., `https://eagle-loans-backend.onrender.com`)
- [ ] Save this URL for frontend configuration

### Step 7: Verify Backend
- [ ] Visit: `https://your-backend-url.onrender.com/health`
  - Should return: `{"status":"ok",...}`
- [ ] Visit: `https://your-backend-url.onrender.com/api/test`
  - Should return: `{"message":"API is working correctly",...}`
- [ ] Check logs for: `[SUCCESS] ✅ SMTP connection verified`
  - If error, check email password

---

## 🎨 Frontend Deployment

### Step 8: Create Frontend Service
- [ ] Go to Render Dashboard
- [ ] Click **"New +"** → **"Static Site"**
- [ ] Connect same GitHub repository
- [ ] Select `eagle-loan` repository

### Step 9: Configure Frontend
- [ ] **Name**: `eagle-loans-frontend`
- [ ] **Branch**: `main` (or your default branch)
- [ ] **Root Directory**: Leave empty
- [ ] **Build Command**: `npm install && npm run build`
- [ ] **Publish Directory**: `dist`

### Step 10: Set Frontend Environment Variable
- [ ] **"Advanced"** → **"Add Environment Variable"**
- [ ] `VITE_API_URL` = `https://your-backend-url.onrender.com`
  - ⚠️ Use the backend URL from Step 6

### Step 11: Deploy Frontend
- [ ] Click **"Create Static Site"**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy frontend URL (e.g., `https://eagle-loans-frontend.onrender.com`)
- [ ] Save this URL

### Step 12: Update Backend CORS
- [ ] Go to Backend Service → **"Environment"**
- [ ] Update `ALLOWED_ORIGINS` to include frontend URL:
  - `https://eagleloans.site,https://www.eagleloans.site,https://eagle-loans-frontend.onrender.com`
- [ ] Save changes (auto-redeploys)

---

## 🔄 Update Frontend with Backend URL

### Step 13: Update Frontend API URL
- [ ] Go to Frontend Service → **"Environment"**
- [ ] Update `VITE_API_URL` to your backend URL
- [ ] Click **"Save Changes"**
- [ ] Go to **"Manual Deploy"** → **"Deploy latest commit"**
- [ ] Wait for redeployment

---

## 🧪 Testing Phase

### Step 14: Test Frontend
- [ ] Visit frontend URL
- [ ] Check browser console for errors
- [ ] Verify all pages load correctly
- [ ] Test navigation

### Step 15: Test Backend Connection
- [ ] Open browser console on frontend
- [ ] Check network tab for API calls
- [ ] Verify API calls go to correct backend URL
- [ ] Check for CORS errors (should be none)

### Step 16: Test Email Functionality
- [ ] Fill out loan application form
- [ ] Submit application
- [ ] Check backend logs for success message
- [ ] Check email inbox: `company@eagleloans.site`
- [ ] Verify email received with correct formatting

---

## 🌐 Custom Domain Setup (Optional)

### Step 17: Configure Frontend Domain
- [ ] Go to Frontend Service → **"Settings"** → **"Custom Domains"**
- [ ] Click **"Add Custom Domain"**
- [ ] Enter: `eagleloans.site`
- [ ] Click **"Add"**
- [ ] Copy DNS instructions

### Step 18: Configure Backend Domain
- [ ] Go to Backend Service → **"Settings"** → **"Custom Domains"**
- [ ] Click **"Add Custom Domain"**
- [ ] Enter: `api.eagleloans.site`
- [ ] Click **"Add"**
- [ ] Copy DNS instructions

### Step 19: Update DNS Records
- [ ] Log in to Namecheap
- [ ] Go to Domain List → `eagleloans.site` → **"Manage"**
- [ ] Go to **"Advanced DNS"** tab
- [ ] Add/Update CNAME records:
  - `@` → `your-frontend.onrender.com`
  - `www` → `your-frontend.onrender.com`
  - `api` → `your-backend.onrender.com`
- [ ] Save changes
- [ ] Wait for DNS propagation (5-60 minutes)

### Step 20: Update Environment Variables After DNS
- [ ] Wait for DNS to propagate (check with online DNS checker)
- [ ] Update Frontend: `VITE_API_URL` = `https://api.eagleloans.site`
- [ ] Update Backend: `ALLOWED_ORIGINS` = `https://eagleloans.site,https://www.eagleloans.site`
- [ ] Redeploy both services
- [ ] Test with custom domains

---

## ✅ Final Verification

### Step 21: Complete Testing
- [ ] Frontend accessible at custom domain (if configured)
- [ ] Backend accessible at custom domain (if configured)
- [ ] All pages load correctly
- [ ] Loan application form works
- [ ] Email sending works
- [ ] No console errors
- [ ] No CORS errors
- [ ] Health check passing

### Step 22: Documentation
- [ ] Save all URLs (frontend, backend)
- [ ] Document environment variables
- [ ] Note any custom configurations
- [ ] Save DNS records information

---

## 🎉 Deployment Complete!

Your Eagle Loans application is now live on Render!

### Quick Links
- **Frontend**: [Your frontend URL]
- **Backend**: [Your backend URL]
- **Health Check**: [Your backend URL]/health
- **Email**: company@eagleloans.site

### Next Steps
- Monitor logs for any issues
- Set up monitoring/alerts (optional)
- Configure backups (if needed)
- Update documentation with live URLs

---

## 🆘 If Something Goes Wrong

1. **Check Logs**: Render Dashboard → Service → **"Logs"** tab
2. **Verify Environment Variables**: All required vars are set
3. **Test Health Endpoint**: `/health` should return OK
4. **Check Email Password**: Verify it's correct
5. **Review Deployment Guide**: See `RENDER_DEPLOYMENT.md` for detailed troubleshooting

---

**Need Help?** Refer to:
- `RENDER_DEPLOYMENT.md` - Detailed guide
- `RENDER_QUICK_START.md` - Quick reference
- `DEPLOYMENT_SUMMARY.md` - Overview

