# Namecheap Deployment Checklist

Quick checklist for deploying Eagle Loans on Namecheap.

## ✅ Pre-Deployment

- [ ] SSH access enabled in cPanel
- [ ] Node.js version 18+ or 20+ available in cPanel
- [ ] PM2 installed (`npm install -g pm2`)
- [ ] Git repository cloned or files uploaded
- [ ] Email account configured: `company@eagleloans.site`

## 🔧 Backend Setup (API Subdomain)

- [ ] Created subdomain: `api.eagleloans.site`
- [ ] Uploaded server files to `/home/yourusername/api.eagleloans.site/server/`
- [ ] Created `.env` file with production values
- [ ] Installed dependencies: `npm install --production`
- [ ] Created logs directory: `mkdir -p logs`
- [ ] Started server with PM2: `pm2 start index.js --name eagle-loans-api`
- [ ] Saved PM2 config: `pm2 save`
- [ ] Tested health endpoint: `https://api.eagleloans.site/health`
- [ ] Tested API endpoint: `https://api.eagleloans.site/api/test`

## 🎨 Frontend Setup (Main Domain)

- [ ] Built frontend locally: `VITE_API_URL=https://api.eagleloans.site npm run build`
- [ ] Uploaded `dist/` contents to `/home/yourusername/public_html/`
- [ ] Uploaded `.htaccess` file to `public_html/`
- [ ] Set file permissions correctly (644 for files, 755 for directories)
- [ ] Tested homepage: `https://eagleloans.site`
- [ ] Tested all pages (About, Contact, Apply Loan, etc.)

## 🔗 Connection

- [ ] Verified `ALLOWED_ORIGINS` in backend `.env` includes frontend domain
- [ ] Verified `VITE_API_URL` in frontend build points to backend
- [ ] Tested loan application form submission
- [ ] Verified email receipt at `company@eagleloans.site`

## 🔒 Security

- [ ] SSL certificate installed and working
- [ ] `.env` file not committed to Git
- [ ] `.htaccess` files uploaded
- [ ] Security headers configured
- [ ] HTTPS redirect working

## ✅ Final Testing

- [ ] Frontend loads correctly
- [ ] All pages accessible
- [ ] Loan application form works
- [ ] Email notifications received
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] Fast loading times

## 📝 Notes

- Replace `yourusername` with your actual cPanel username
- Backend directory: `/home/yourusername/api.eagleloans.site/server`
- Frontend directory: `/home/yourusername/public_html/`
- PM2 status: `pm2 status`
- PM2 logs: `pm2 logs eagle-loans-api`

---

**Ready for Production!** ✅

