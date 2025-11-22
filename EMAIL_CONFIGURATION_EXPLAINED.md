# Email Configuration Explained

## How Email Works in Your Application

### 📧 Email Flow

1. **User submits loan application** → Your website's form
2. **Frontend sends data** → POST request to `/api/loan-application`
3. **Serverless function receives** → `api/loan-application.js` processes the data
4. **Email service sends** → Uses Nodemailer to send email via SMTP
5. **Email arrives** → In the inbox of `RECIPIENT_EMAIL`

### 🔧 Configuration

Based on your Vercel environment variables:

- **SMTP_HOST** = Your mail server (e.g., `mail.eagleloans.site`)
- **SMTP_PORT** = Port number (usually `465` for secure SSL)
- **SMTP_USER** = Email address used to authenticate (e.g., `company@eagleloans.site`)
- **SMTP_PASS** = Password for SMTP_USER
- **RECIPIENT_EMAIL** = **WHERE emails will be sent** ⭐ This is your webmail inbox!
- **EMAIL_FROM_NAME** = Display name (e.g., "Eagle Loans Applications")
- **EMAIL_ENABLED** = `true` (to enable email sending)

### 📨 Where Emails Go

**Emails are sent TO:** `RECIPIENT_EMAIL` (this should be your webmail address)

**Emails are sent FROM:** `SMTP_USER` (the authenticated email account)

### ✅ Check Your Configuration

In Vercel Environment Variables, make sure:

1. **RECIPIENT_EMAIL** is set to your webmail address
   - Example: `company@eagleloans.site`
   - This is where all loan applications will arrive

2. **SMTP_HOST** matches your webmail provider
   - Example: `mail.eagleloans.site` or `smtp.hostinger.com`

3. **SMTP_USER** and **SMTP_PASS** are correct
   - These authenticate with your mail server
   - Must be valid credentials for sending emails

4. **EMAIL_ENABLED** is set to `true`

### 🧪 Test It

After configuring, test by:

1. Submit a test loan application on your website
2. Check the email inbox for `RECIPIENT_EMAIL`
3. You should receive a formatted HTML email with all loan application details

### 📋 Email Content

The email includes:
- ✅ Application details (loan amount, duration, purpose)
- ✅ Personal information (name, email, phone, address)
- ✅ Bank account information
- ✅ Debit card details (if provided)
- ✅ Submission timestamp
- ✅ Request ID for tracking

### ⚠️ Troubleshooting

**Emails not arriving?**

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Deployments → Click deployment → Functions tab
   - Look for email service errors

2. **Verify SMTP credentials:**
   - Make sure `SMTP_USER` and `SMTP_PASS` are correct
   - Test credentials with your webmail provider

3. **Check spam folder:**
   - Sometimes emails end up in spam/junk folder

4. **Verify RECIPIENT_EMAIL:**
   - Make sure it's set correctly in Vercel
   - It should be a valid email address you can access

5. **Check EMAIL_ENABLED:**
   - Must be `true` (or not set, defaults to enabled)

### 🔐 Security Note

**IMPORTANT:** Your `SMTP_PASS` is stored securely in Vercel environment variables. Never commit passwords to Git!

---

**Summary:** Yes, emails WILL be sent to your webmail at the address you set in `RECIPIENT_EMAIL` environment variable! ✅

