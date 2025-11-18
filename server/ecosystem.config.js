module.exports = {
  apps: [
    {
      name: 'loan-api',
      script: './index.js',
      cwd: '/home/username/api.trustlendingfunds.com',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 80,
        ALLOWED_ORIGINS: 'https://trustlendingfunds.com,https://www.trustlendingfunds.com',
        SMTP_HOST: 'smtp.hostinger.com',
        SMTP_PORT: 465,
        SMTP_USER: 'loans@trustlendingfunds.com',
        SMTP_PASS: 'Trustlending_funds1717',
        RECIPIENT_EMAIL: 'loans@trustlendingfunds.com',
        EMAIL_FROM_NAME: 'Loan Applications'
      },
      error_file: '/home/username/api.trustlendingfunds.com/logs/err.log',
      out_file: '/home/username/api.trustlendingfunds.com/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
