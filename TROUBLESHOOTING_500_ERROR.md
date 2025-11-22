# Troubleshooting 500 Internal Server Error

## ✅ Progress: API URL Fixed!

Your API is now correctly calling `/api/loan-application` (relative path). The 500 error is a **different issue** - it's coming from the serverless function itself.

## 🔍 How to Find the Exact Error

### Step 1: Check Vercel Function Logs

1. Go to **Vercel Dashboard** → Your Project
2. Click **"Deployments"** tab
3. Click on the **latest deployment** (the one that's failing)
4. Look for **"Functions"** tab or **"Runtime Logs"** tab
5. Click on `/api/loan-application`
6. Look for error messages - they'll start with `[ERROR]`

### Step 2: Common Error Messages to Look For

**If you see:**
- `SMTP transporter is not configured` → Missing SMTP environment variables
- `Failed to send email` → SMTP connection/authentication issue
- `Missing required fields` → Validation error (should be 400, not 500)
- `Cannot find module` → Missing dependencies

## 🐛 Most Likely Causes

### 1. Missing SMTP Environment Variables

**Check in Vercel:**
- Settings → Environment Variables
- Make sure ALL of these are set:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `RECIPIENT_EMAIL`
  - `EMAIL_FROM_NAME`
  - `EMAIL_ENABLED` (should be `true`)

### 2. SMTP Authentication Failed

**If SMTP credentials are wrong:**
- Check `SMTP_USER` and `SMTP_PASS` are correct
- Verify email account password works
- Test SMTP settings outside Vercel

### 3. Missing Dependencies

**Unlikely but possible:**
- `nodemailer` should be in `package.json` (it is ✅)
- Vercel might not have installed it during build

## ✅ What I Fixed

1. **Better Error Handling:**
   - Email errors won't crash the request anymore
   - Application will succeed even if email fails
   - Better error messages in response

2. **More Detailed Logging:**
   - Errors now show full stack traces
   - Error messages visible in production

## 🔧 Quick Fixes

### Option 1: Disable Email Temporarily (Test if email is the issue)

1. Go to Vercel → Settings → Environment Variables
2. Set `EMAIL_ENABLED=false`
3. Redeploy
4. Test again - if it works, email was the issue

### Option 2: Check SMTP Configuration

1. Verify all SMTP env vars are set correctly
2. Test SMTP credentials manually:
   ```bash
   # Test with nodemailer from your local machine
   # Or contact your email provider
   ```

### Option 3: View Full Error Details

1. Check Vercel function logs (see Step 1 above)
2. Copy the exact error message
3. Share it to debug further

## 📝 After Checking Logs

**Once you see the exact error in Vercel logs, you'll know:**

- If it's missing env vars → Add them in Vercel
- If it's SMTP auth error → Fix SMTP credentials
- If it's something else → Share the error message

## 🎯 Next Steps

1. **Check Vercel function logs** (most important!)
2. **Verify all SMTP environment variables are set**
3. **Test again after fixing**

---

**Remember:** The improved code I just added will make email errors non-fatal, but you still need to fix the underlying issue (likely missing SMTP config).

