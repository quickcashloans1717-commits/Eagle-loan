# Vercel Deployment Guide for Eagle Loans

This guide will help you deploy your Eagle Loans application to Vercel.

## Prerequisites

1. A GitHub account with your repository: `https://github.com/quickcashloans1717-commits/Eagle-loan.git`
2. A Vercel account (sign up at [vercel.com](https://vercel.com) if needed)
3. SMTP email credentials (if you want email notifications)

## Project Structure

Your project has been configured for Vercel deployment with:

- **Frontend**: React + Vite application in `src/`
- **Backend API**: Serverless functions in `api/` directory
- **Email Service**: Shared email utility in `lib/emailService.js`

## Step 1: Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `quickcashloans1717-commits/Eagle-loan`
4. Vercel will automatically detect your project settings

## Step 2: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 3: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Frontend Environment Variables

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key_here
```

> **Note**: 
> - `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are **OPTIONAL**. Your app currently doesn't use Supabase features (login/signup are simulated). Only add these if you plan to use Supabase in the future.
> - `VITE_API_URL` is also optional. If not set, the app will use relative paths to call the API endpoints (recommended for Vercel).

### Backend Environment Variables (for Serverless Functions)

```
SMTP_HOST=your_smtp_host
SMTP_PORT=465
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
RECIPIENT_EMAIL=company@eagleloans.site
EMAIL_FROM_NAME=Eagle Loans Applications
EMAIL_ENABLED=true
NODE_ENV=production
```

### Example Configuration (from your env.example)

```
SMTP_HOST=mail.eagleloans.site
SMTP_PORT=465
SMTP_USER=company@eagleloans.site
SMTP_PASS=your_password_here
RECIPIENT_EMAIL=company@eagleloans.site
EMAIL_FROM_NAME=Eagle Loans Applications
EMAIL_ENABLED=true
```

## Step 4: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your frontend (`npm run build`)
   - Deploy serverless functions from `api/` directory
   - Deploy your static frontend

## Step 5: Verify Deployment

After deployment, you should see:

1. **Production URL**: `https://your-project-name.vercel.app`
2. **Deployment Status**: Should show "Ready"

### Test Your Deployment

1. Visit your production URL
2. Check API health: `https://your-project-name.vercel.app/api/health`
3. Test loan application submission

## API Endpoints

Your serverless functions are available at:

- **Health Check**: `GET /api/health`
- **Loan Application**: `POST /api/loan-application`

## Environment Variables Setup in Vercel

### How to Add Environment Variables:

1. Go to your project on Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `SMTP_HOST`)
   - **Value**: Variable value
   - **Environment**: Select Production, Preview, and/or Development
4. Click **Save**
5. **Important**: After adding new environment variables, you need to redeploy!

### Redeploy After Environment Variable Changes:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

## Custom Domain Setup (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `eagleloans.site`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (can take a few minutes to 48 hours)

## Troubleshooting

### Build Failures

1. **Check build logs**: Click on the failed deployment to see error logs
2. **Common issues**:
   - Missing dependencies: Ensure `package.json` has all required packages
   - Environment variables: Verify all required variables are set
   - Build command errors: Check for TypeScript/ESLint errors

### API Endpoints Not Working

1. **Check function logs**: Go to **Deployments** → Click deployment → **Functions** tab
2. **Verify environment variables**: Ensure SMTP credentials are set
3. **Test locally**: Use `vercel dev` to test serverless functions locally

### Email Not Sending

1. **Check environment variables**: Verify SMTP credentials are correct
2. **Check function logs**: Look for email service errors
3. **Test SMTP connection**: Verify your SMTP settings work outside Vercel
4. **Enable logs**: Check Vercel function logs for detailed error messages

### CORS Issues

- CORS is already configured in the serverless functions
- If you encounter CORS issues, check that your frontend URL matches the allowed origins

## Local Development with Vercel

To test your Vercel setup locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Run development server with serverless functions
vercel dev
```

## Continuous Deployment

Once connected to GitHub, Vercel will:

- Automatically deploy on every push to `main` branch
- Create preview deployments for pull requests
- Keep your production site always up to date

## Monitoring & Analytics

Vercel provides:

- **Function Logs**: View serverless function execution logs
- **Analytics**: Track page views and performance
- **Speed Insights**: Monitor Core Web Vitals

## Security Notes

1. **Never commit** `.env` files with real credentials
2. **Use Vercel Environment Variables** for all secrets
3. **Enable Vercel's Security Headers** in `vercel.json` (already configured)
4. **Rate Limiting**: Consider adding rate limiting if needed

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Quick Deploy Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] API endpoints tested (`/api/health`)
- [ ] Loan application submission tested
- [ ] Email notifications working (if enabled)
- [ ] Custom domain configured (optional)

---

**Ready to deploy?** Follow steps 1-4 above and your app will be live in minutes!

