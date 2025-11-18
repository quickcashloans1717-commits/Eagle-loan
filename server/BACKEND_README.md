# 🚀 Improved Loan API Backend

## What's New

This is a completely rewritten and improved backend that:

✅ **Better Error Handling** - More detailed error messages and logging
✅ **Improved CORS** - Better cross-origin request handling
✅ **Better Email** - Enhanced email formatting with security
✅ **Health Check** - Detailed health status endpoint
✅ **Request Tracking** - Unique request IDs for debugging
✅ **Better Logging** - Comprehensive debug logging for troubleshooting
✅ **Graceful Shutdown** - Proper process termination
✅ **Test Endpoint** - `/api/test` for quick testing

## Features

### Endpoints

#### 1. Health Check
```
GET /health

Response:
{
  "status": "ok",
  "timestamp": "2025-11-18T12:34:56.789Z",
  "uptime": 123.456
}
```

#### 2. Loan Application
```
POST /api/loan-application

Request Body:
{
  "loanAmount": "25000",
  "loanDuration": "36",
  "loanPurpose": "Debt Consolidation",
  "loanType": "personal",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "bankName": "Chase",
  "routingNumber": "021000021",
  "accountNumber": "123456789"
}

Response (Success):
{
  "success": true,
  "message": "Loan application submitted successfully",
  "requestId": "1700318496789-abc123def",
  "timestamp": "2025-11-18T12:34:56.789Z"
}

Response (Error):
{
  "success": false,
  "message": "Missing required fields: firstName, email",
  "requestId": "1700318496789-abc123def"
}
```

#### 3. Test Endpoint
```
GET /api/test

Response:
{
  "message": "API is working correctly",
  "timestamp": "2025-11-18T12:34:56.789Z"
}
```

### Key Improvements

#### Security
- ✅ Input validation
- ✅ Email format validation
- ✅ CORS protection
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Security headers via Helmet.js
- ✅ Sensitive data masking in emails

#### Reliability
- ✅ Unique request IDs for tracking
- ✅ Comprehensive error handling
- ✅ SMTP verification on startup
- ✅ Graceful shutdown
- ✅ Better logging

#### Developer Experience
- ✅ Clear console output
- ✅ Detailed error messages
- ✅ Request logging
- ✅ API test endpoint
- ✅ Health check endpoint

## Configuration

### Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=https://trustlendingfunds.com,https://www.trustlendingfunds.com

# Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=loans@trustlendingfunds.com
SMTP_PASS=your_password_here
RECIPIENT_EMAIL=loans@trustlendingfunds.com
EMAIL_FROM_NAME=Loan Applications
```

## Testing

### Test with cURL

```bash
# Health check
curl http://localhost:3001/health

# Test endpoint
curl http://localhost:3001/api/test

# Loan application
curl -X POST http://localhost:3001/api/loan-application \
  -H "Content-Type: application/json" \
  -d '{
    "loanAmount": "25000",
    "loanDuration": "36",
    "loanPurpose": "Debt Consolidation",
    "loanType": "personal",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "address1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "bankName": "Chase",
    "routingNumber": "021000021",
    "accountNumber": "123456789"
  }'
```

### Test with JavaScript/Fetch

```javascript
// Health check
const healthResponse = await fetch('http://localhost:3001/health');
const health = await healthResponse.json();
console.log(health);

// Loan application
const applicationResponse = await fetch('http://localhost:3001/api/loan-application', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    loanAmount: '25000',
    loanDuration: '36',
    loanPurpose: 'Debt Consolidation',
    loanType: 'personal',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address1: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    bankName: 'Chase',
    routingNumber: '021000021',
    accountNumber: '123456789'
  })
});

const result = await applicationResponse.json();
console.log(result);
```

## Files Modified

1. **`server/index.js`** - Complete rewrite
   - Better error handling
   - Improved CORS
   - Request tracking
   - Health check endpoint
   - Test endpoint
   - Graceful shutdown

2. **`server/emailService.js`** - Enhanced
   - Better HTML formatting
   - Sensitive data masking
   - SMTP verification
   - Better error messages

3. **`src/lib/api.ts`** - Improved client
   - Better error handling
   - Console logging
   - Health check function
   - Better response parsing

## Logging Output

### Server Startup

```
[INFO] Starting Loan API Server...
[INFO] Port: 3001
[INFO] Allowed Origins: https://trustlendingfunds.com, ...
[SUCCESS] ✅ Loan API Server is running on port 3001
[SUCCESS] ✅ SMTP connection verified
```

### Successful Request

```
[REQUEST] 1700318496789-abc123def - Loan application received
[INFO] 1700318496789-abc123def - Sending email notification...
[SUCCESS] 1700318496789-abc123def - Application processed successfully
```

### Error Handling

```
[WARN] 1700318496789-abc123def - Missing fields: firstName, email
[ERROR] 1700318496789-abc123def - SMTP error: Invalid credentials
```

## Troubleshooting

### "CORS blocked request"
- Check `ALLOWED_ORIGINS` environment variable
- Ensure frontend URL is included
- Make sure URL includes protocol (https://)

### "Failed to send email"
- Verify SMTP credentials
- Check SMTP_HOST and SMTP_PORT
- Ensure firewall allows SMTP
- Check email spam folder

### "API not responding"
- Verify port is correct
- Check if server is running: `pm2 list`
- View logs: `pm2 logs loan-api`

### "Health check fails"
- Server may not be running
- Check SMTP configuration
- View startup logs

## Production Deployment

### Using PM2

```bash
# Start
pm2 start index.js --name "loan-api"

# Restart
pm2 restart loan-api

# View logs
pm2 logs loan-api

# Status
pm2 list
```

### Using Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

## Performance

- Response time: < 1 second
- Rate limit: 100 requests per 15 minutes
- Payload size limit: 5 MB
- SMTP timeout: Default (typically 5 seconds)

## Support

For issues or questions:
1. Check logs: `pm2 logs loan-api`
2. Test health: `GET /health`
3. Test API: `GET /api/test`
4. Review .env configuration
5. Check SMTP credentials

---

**Backend Version**: 2.0 (Improved)  
**Last Updated**: 2025-11-18
