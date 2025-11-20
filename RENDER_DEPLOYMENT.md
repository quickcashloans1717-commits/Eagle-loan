# 🚀 Render Deployment Guide - Eagle Loans

Complete step-by-step guide to deploy your Eagle Loans application (frontend + backend) on Render with Namecheap email integration.

---

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Namecheap Email**: `company@eagleloans.site` with password ready
4. **Domain**: `eagleloans.site` (for custom domain setup)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│   Frontend (Static Site)            │
│   eagleloans.site                   │
│   - React + Vite                    │
│   - Static files                    │
└─────────────────────────────────────┘
              ↓ (API calls)
┌─────────────────────────────────────┐
│   Backend (Web Service)             │
│   api.eagleloans.site               │
│   - Node.js + Express               │
│   - Port: 10000 (Render default)    │
└─────────────────────────────────────┘
              ↓ (SMTP)
┌─────────────────────────────────────┐
│   Namecheap Email Server            │
│   mail.eagleloans.site:465          │
│   company@eagleloans.site           │
└─────────────────────────────────────┘
```

---

## 📦 Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If not already done:
```bash
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eagle-loan.git
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend (Static Site)

### 2.1 Create Static Site Service

1. **Login to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click **"New +"** → **"Static Site"**

2. **Connect Repository**
   - Connect your GitHub account if not already connected
   - Select your `eagle-loan` repository
   - Click **"Connect"**

3. **Configure Static Site**
   - **Name**: `eagle-loans-frontend` (or your preferred name)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**:
   ```
   VITE_API_URL=https://api.eagleloans.site
   ```
   ⚠️ **Important**: Replace `api.eagleloans.site` with your actual backend URL after deploying backend (Step 3)

5. **Custom Domain (Optional)**
   - After deployment, go to **Settings** → **Custom Domains**
   - Add `eagleloans.site` and `www.eagleloans.site`
   - Follow DNS configuration instructions

6. **Deploy**
   - Click **"Create Static Site"**
   - Render will build and deploy your frontend
   - Wait for deployment to complete (5-10 minutes)

7. **Get Frontend URL**
   - After deployment, you'll get a URL like: `https://eagle-loans-frontend.onrender.com`
   - Save this URL for backend configuration

---

## ⚙️ Step 3: Deploy Backend (Web Service)

### 3.1 Create Web Service

1. **In Render Dashboard**
   - Click **"New +"** → **"Web Service"**

2. **Connect Repository**
   - Select the same `eagle-loan` repository
   - Click **"Connect"**

3. **Configure Web Service**
   - **Name**: `eagle-loans-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"** and add:

   ```
   PORT=10000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site,https://eagle-loans-frontend.onrender.com
   SMTP_HOST=mail.eagleloans.site
   SMTP_PORT=465
   SMTP_USER=company@eagleloans.site
   SMTP_PASS=YOUR_EMAIL_PASSWORD_HERE
   RECIPIENT_EMAIL=company@eagleloans.site
   EMAIL_FROM_NAME=Eagle Loans Applications
   ```

   ⚠️ **Important**:
   - Replace `YOUR_EMAIL_PASSWORD_HERE` with your actual email password
   - Update `ALLOWED_ORIGINS` with your actual frontend URL after deployment
   - Render uses port 10000 by default, but the PORT env var will be set automatically

5. **Custom Domain (Optional)**
   - After deployment, go to **Settings** → **Custom Domains**
   - Add `api.eagleloans.site`
   - Follow DNS configuration instructions

6. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment to complete (5-10 minutes)

7. **Get Backend URL**
   - After deployment, you'll get a URL like: `https://eagle-loans-backend.onrender.com`
   - Save this URL

---

## 🔄 Step 4: Update Frontend with Backend URL

### 4.1 Update Frontend Environment Variable

1. **Go to Frontend Service**
   - In Render Dashboard, click on your frontend service
   - Go to **"Environment"** tab

2. **Update VITE_API_URL**
   - Edit the `VITE_API_URL` variable
   - Set it to your backend URL: `https://eagle-loans-backend.onrender.com`
   - Or if using custom domain: `https://api.eagleloans.site`

3. **Redeploy**
   - Click **"Manual Deploy"** → **"Deploy latest commit"**
   - This rebuilds the frontend with the correct API URL

---

## 📧 Step 5: Configure Namecheap Email

### 5.1 Verify Email Settings

Your Namecheap email configuration:
- **Email Address**: `company@eagleloans.site`
- **SMTP Server**: `mail.eagleloans.site`
- **SMTP Port**: `465` (SSL/TLS)
- **IMAP Port**: `993` (for receiving)
- **POP3 Port**: `995` (for receiving)
- **Authentication**: Required for all protocols

### 5.2 Test Email Configuration

1. **Check Backend Logs**
   - In Render Dashboard → Backend Service → **"Logs"** tab
   - Look for: `[SUCCESS] ✅ SMTP connection verified`
   - If you see errors, verify your email password

2. **Test Email Sending**
   - Submit a test loan application from your frontend
   - Check backend logs for email sending status
   - Check your `company@eagleloans.site` inbox for the application email

---

## 🌐 Step 6: Configure Custom Domains (Optional)

### 6.1 Frontend Domain (eagleloans.site)

1. **In Render Dashboard**
   - Go to Frontend Service → **"Settings"** → **"Custom Domains"**
   - Click **"Add Custom Domain"**
   - Enter: `eagleloans.site`
   - Click **"Add"**

2. **DNS Configuration in Namecheap**
   - Go to Namecheap DNS settings for `eagleloans.site`
   - Add/Update DNS records:
     ```
     Type: CNAME
     Host: @
     Value: eagle-loans-frontend.onrender.com
     TTL: Automatic
     
     Type: CNAME
     Host: www
     Value: eagle-loans-frontend.onrender.com
     TTL: Automatic
     ```
   - Wait for DNS propagation (5-60 minutes)

### 6.2 Backend Domain (api.eagleloans.site)

1. **In Render Dashboard**
   - Go to Backend Service → **"Settings"** → **"Custom Domains"**
   - Click **"Add Custom Domain"**
   - Enter: `api.eagleloans.site`
   - Click **"Add"**

2. **DNS Configuration in Namecheap**
   - Add DNS record:
     ```
     Type: CNAME
     Host: api
     Value: eagle-loans-backend.onrender.com
     TTL: Automatic
     ```
   - Wait for DNS propagation

### 6.3 Update Environment Variables After DNS

Once DNS is propagated:
1. **Update Frontend**: `VITE_API_URL=https://api.eagleloans.site`
2. **Update Backend**: `ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site`
3. **Redeploy both services**

---

## ✅ Step 7: Verify Deployment

### 7.1 Frontend Verification

1. Visit your frontend URL
2. Check browser console for errors
3. Verify API calls are going to correct backend URL
4. Test navigation and all pages load correctly

### 7.2 Backend Verification

1. Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status":"ok",...}`
2. Visit: `https://your-backend-url.onrender.com/api/test`
   - Should return: `{"message":"API is working correctly",...}`

### 7.3 Email Verification

1. Fill out and submit a loan application
2. Check backend logs for success message
3. Check `company@eagleloans.site` inbox for application email
4. Verify email formatting is correct

---

## 🔧 Troubleshooting

### Issue: Frontend can't connect to backend

**Solution**:
- Check `VITE_API_URL` in frontend environment variables
- Verify backend URL is correct and accessible
- Check CORS settings in backend `ALLOWED_ORIGINS`
- Check browser console for CORS errors

### Issue: Email not sending

**Solution**:
- Verify email password is correct in backend environment variables
- Check backend logs for SMTP connection errors
- Verify `mail.eagleloans.site` is accessible from Render
- Test SMTP settings: Port 465, SSL enabled
- Check Namecheap email account settings

### Issue: Build fails

**Solution**:
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility
- Ensure build commands are correct

### Issue: Custom domain not working

**Solution**:
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct in Namecheap
- Check Render custom domain status
- Use online DNS checker tools

---

## 📊 Monitoring & Maintenance

### Health Checks

Render automatically monitors:
- Backend health endpoint: `/health`
- Service uptime and availability

### Logs

- **View Logs**: Render Dashboard → Service → **"Logs"** tab
- **Real-time**: Logs update in real-time
- **Search**: Use search bar to filter logs

### Updates

To update your application:
1. Push changes to GitHub
2. Render automatically detects and redeploys
3. Or manually trigger: **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit passwords or secrets to Git
2. **HTTPS**: Always use HTTPS in production (Render provides free SSL)
3. **CORS**: Only allow your frontend domains in `ALLOWED_ORIGINS`
4. **Rate Limiting**: Already configured in backend
5. **Email Password**: Use strong password and rotate regularly

---

## 💰 Render Pricing

- **Free Tier**: 
  - Static Sites: Free forever
  - Web Services: Free tier available (spins down after 15 min inactivity)
- **Paid Plans**: 
  - Starts at $7/month for always-on web services
  - Better performance and no spin-down

---

## 📞 Support

- **Render Support**: [render.com/docs](https://render.com/docs)
- **Render Community**: [community.render.com](https://community.render.com)
- **Namecheap Support**: [namecheap.com/support](https://www.namecheap.com/support)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Render (Static Site)
- [ ] Backend deployed on Render (Web Service)
- [ ] Environment variables configured correctly
- [ ] Frontend `VITE_API_URL` points to backend
- [ ] Backend `ALLOWED_ORIGINS` includes frontend URL
- [ ] Email SMTP settings configured (Namecheap)
- [ ] Email sending tested and working
- [ ] Custom domains configured (optional)
- [ ] DNS records updated (if using custom domains)
- [ ] Health checks passing
- [ ] Full application tested end-to-end

---

**🎉 Congratulations! Your Eagle Loans application is now live on Render!**

