# ⚡ Render Quick Start Guide

## 🚀 Fast Deployment (15 minutes)

### Prerequisites
- GitHub account with your code pushed
- Render account (sign up at render.com)
- Namecheap email password ready

---

## Step 1: Deploy Backend (5 min)

1. **Render Dashboard** → **"New +"** → **"Web Service"**
2. **Connect** your GitHub repository
3. **Configure**:
   - Name: `eagle-loans-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables**:
   ```
   PORT=10000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://eagleloans.site,https://www.eagleloans.site
   SMTP_HOST=mail.eagleloans.site
   SMTP_PORT=465
   SMTP_USER=company@eagleloans.site
   SMTP_PASS=YOUR_EMAIL_PASSWORD
   RECIPIENT_EMAIL=company@eagleloans.site
   EMAIL_FROM_NAME=Eagle Loans Applications
   ```
5. **Deploy** → Wait for URL (e.g., `https://eagle-loans-backend.onrender.com`)

---

## Step 2: Deploy Frontend (5 min)

1. **Render Dashboard** → **"New +"** → **"Static Site"**
2. **Connect** same GitHub repository
3. **Configure**:
   - Name: `eagle-loans-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://eagle-loans-backend.onrender.com
   ```
   (Replace with your actual backend URL from Step 1)
5. **Deploy** → Wait for URL

---

## Step 3: Update Frontend with Backend URL (2 min)

1. Go to **Frontend Service** → **Environment**
2. Update `VITE_API_URL` to your backend URL
3. **Manual Deploy** → **"Deploy latest commit"**

---

## Step 4: Test (3 min)

1. **Backend Health**: Visit `https://your-backend-url.onrender.com/health`
2. **Frontend**: Visit your frontend URL
3. **Email Test**: Submit a loan application
4. **Check Email**: Verify email received at `company@eagleloans.site`

---

## ✅ Done!

Your app is live! For custom domains and advanced setup, see `RENDER_DEPLOYMENT.md`

---

## 🔧 Troubleshooting

**Email not working?**
- Check backend logs for SMTP errors
- Verify email password is correct
- Ensure port 465 is used (SSL/TLS)

**Frontend can't connect?**
- Verify `VITE_API_URL` matches backend URL
- Check CORS settings in backend `ALLOWED_ORIGINS`

**Build failing?**
- Check build logs in Render dashboard
- Verify all dependencies in `package.json`

