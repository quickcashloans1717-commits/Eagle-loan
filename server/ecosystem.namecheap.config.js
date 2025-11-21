// PM2 Ecosystem Configuration for Namecheap
// Usage: pm2 start ecosystem.namecheap.config.js

module.exports = {
  apps: [
    {
      name: 'eagle-loans-api',
      script: './index.js',
      cwd: '/home/yourusername/api.eagleloans.site/server',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 10000,
        EMAIL_ENABLED: 'true',
        ALLOWED_ORIGINS: 'https://eagleloans.site,https://www.eagleloans.site,https://api.eagleloans.site',
        SMTP_HOST: 'mail.eagleloans.site',
        SMTP_PORT: '465',
        SMTP_USER: 'company@eagleloans.site',
        SMTP_PASS: '6HCgUubyuBKLHQa',
        RECIPIENT_EMAIL: 'company@eagleloans.site',
        EMAIL_FROM_NAME: 'Eagle Loans Applications'
      },
      error_file: '/home/yourusername/api.eagleloans.site/server/logs/err.log',
      out_file: '/home/yourusername/api.eagleloans.site/server/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10
    }
  ]
};

// INSTRUCTIONS:
// 1. Replace 'yourusername' with your actual cPanel username
// 2. Create logs directory: mkdir -p /home/yourusername/api.eagleloans.site/server/logs
// 3. Start with: pm2 start ecosystem.namecheap.config.js
// 4. Save PM2 config: pm2 save
// 5. Setup startup: pm2 startup

