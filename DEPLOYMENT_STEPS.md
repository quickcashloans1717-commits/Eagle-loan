# 🚀 Step-by-Step Deployment Guide - Follow Along

## ⚠️ IMPORTANT SECURITY NOTE
Your email password should NEVER be in code files. We'll set it securely in Render's dashboard.

---

## 📋 STEP 1: Prepare Your Code on GitHub

### Action Items:
1. **Check if your code is on GitHub**
   - Do you have a GitHub account? ✅ / ❌
   - Is your code already pushed to GitHub? ✅ / ❌

### If NOT on GitHub yet:
```bash
# Open terminal in your project folder (D:\eagle-loan)
git init
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eagle-loan.git
git push -u origin main
```

### If already on GitHub:
- Just make sure latest code is pushed:
```bash
git add .
git commit -m "Updated for Render deployment"
git push
```

**✅ Tell me when Step 1 is complete, and I'll guide you to Step 2!**

---

## 📋 STEP 2: Create Render Account

### Action Items:
1. Go to: https://render.com
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up with:
   - GitHub (recommended - easiest)
   - OR Email
4. Verify your email if needed

**✅ Tell me when you have a Render account and I'll guide you to Step 3!**

---

## 📋 STEP 3: Deploy Backend (Web Service)

### Action Items:

1. **In Render Dashboard:**
   - Click the **"New +"** button (top right)
   - Select **"Web Service"**

2. **Connect Repository:**
   - If using GitHub, click **"Connect GitHub"**
   - Authorize Render to access your repositories
   - Select your `eagle-loan` repository
   - Click **"Connect"**

3. **Configure Service:**
   - **Name**: `eagle-loans-backend`
   - **Environment**: `Node` (should be auto-selected)
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server` ⚠️ IMPORTANT!
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables:**
   Click **"Advanced"** → Scroll to **"Environment Variables"** → Click **"Add Environment Variable"**
   
   Add these ONE BY ONE:
   
   ```
   Key: PORT
   Value: 10000
   ```
   
   ```
   Key: NODE_ENV
   Value: production
   ```
   
   ```
   Key: ALLOWED_ORIGINS
   Value: https://eagleloans.site,https://www.eagleloans.site
   ```
   (We'll update this later with actual frontend URL)
   
   ```
   Key: SMTP_HOST
   Value: mail.eagleloans.site
   ```
   
   ```
   Key: SMTP_PORT
   Value: 465
   ```
   
   ```
   Key: SMTP_USER
   Value: company@eagleloans.site
   ```
   
   ```
   Key: SMTP_PASS
   Value: 6HCgUubyuBKLHQa
   ```
   ⚠️ This is your email password - keep it secret!
   
   ```
   Key: RECIPIENT_EMAIL
   Value: company@eagleloans.site
   ```
   
   ```
   Key: EMAIL_FROM_NAME
   Value: Eagle Loans Applications
   ```

5. **Deploy:**
   - Scroll down and click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Watch the build logs

6. **Get Your Backend URL:**
   - Once deployed, you'll see a URL like: `https://eagle-loans-backend.onrender.com`
   - **COPY THIS URL** - you'll need it for frontend!

7. **Test Backend:**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should see: `{"status":"ok",...}`
   - Check logs for: `[SUCCESS] ✅ SMTP connection verified`

**✅ Tell me when backend is deployed and working, and I'll guide you to Step 4!**

---

## 📋 STEP 4: Deploy Frontend (Static Site)

### Action Items:

1. **In Render Dashboard:**
   - Click **"New +"** button again
   - Select **"Static Site"**

2. **Connect Repository:**
   - Select the same `eagle-loan` repository
   - Click **"Connect"**

3. **Configure Service:**
   - **Name**: `eagle-loans-frontend`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave EMPTY (not `server`)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Set Environment Variable:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.onrender.com
   ```
   ⚠️ Replace `your-backend-url.onrender.com` with your ACTUAL backend URL from Step 3!

5. **Deploy:**
   - Click **"Create Static Site"**
   - Wait 5-10 minutes for deployment

6. **Get Your Frontend URL:**
   - Once deployed, you'll see a URL like: `https://eagle-loans-frontend.onrender.com`
   - **COPY THIS URL**

**✅ Tell me when frontend is deployed, and I'll guide you to Step 5!**

---

## 📋 STEP 5: Connect Frontend to Backend

### Action Items:

1. **Update Backend CORS:**
   - Go to your **Backend Service** in Render
   - Click **"Environment"** tab
   - Find `ALLOWED_ORIGINS`
   - Click **"Edit"**
   - Update value to include your frontend URL:
     ```
     https://eagleloans.site,https://www.eagleloans.site,https://eagle-loans-frontend.onrender.com
     ```
   - Replace `eagle-loans-frontend.onrender.com` with your ACTUAL frontend URL
   - Click **"Save Changes"**
   - Backend will auto-redeploy

2. **Verify Frontend API URL:**
   - Go to your **Frontend Service** in Render
   - Click **"Environment"** tab
   - Verify `VITE_API_URL` is set to your backend URL
   - If not correct, update it and click **"Save Changes"**
   - Go to **"Manual Deploy"** → **"Deploy latest commit"**
   - Wait for redeployment

**✅ Tell me when both are updated, and I'll guide you to Step 6!**

---

## 📋 STEP 6: Test Everything

### Action Items:

1. **Test Backend:**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should see: `{"status":"ok",...}`
   - Visit: `https://your-backend-url.onrender.com/api/test`
   - Should see: `{"message":"API is working correctly",...}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Open browser console (F12)
   - Check for any errors
   - Navigate through pages

3. **Test Email:**
   - Fill out the loan application form
   - Submit it
   - Check backend logs (Render Dashboard → Backend → Logs tab)
   - Look for: `[SUCCESS] ✅ Email sent successfully`
   - Check your email: `company@eagleloans.site`
   - You should receive the application email

**✅ Tell me the results of your tests, and I'll help with any issues!**

---

## 📋 STEP 7: Custom Domain (Optional)

If you want to use `eagleloans.site` instead of the Render URLs:

### Frontend Domain:
1. Go to Frontend Service → **"Settings"** → **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `eagleloans.site`
4. Follow DNS instructions

### Backend Domain:
1. Go to Backend Service → **"Settings"** → **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `api.eagleloans.site`
4. Follow DNS instructions

### Update DNS in Namecheap:
- Add CNAME records as instructed by Render
- Wait for DNS propagation (5-60 minutes)

**✅ Let me know if you want help with custom domains!**

---

## 🎉 You're Done!

Your application should now be live and working!

### Quick Links:
- Frontend: [Your frontend URL]
- Backend: [Your backend URL]
- Health Check: [Your backend URL]/health

---

## 🆘 Need Help?

If you encounter any issues at any step, tell me:
1. Which step you're on
2. What error message you see (if any)
3. What you've tried

I'll help you troubleshoot!

