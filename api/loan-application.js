import { sendLoanApplicationEmail } from "../lib/emailService.js";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Only POST requests are accepted.",
    });
  }

  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    console.log(`[REQUEST] ${requestId} - Loan application received`);

    const data = req.body;

    // Validate payload
    if (!data || typeof data !== "object") {
      console.warn("[WARN] Invalid payload type");
      return res.status(400).json({
        success: false,
        message: "Invalid payload. Expected JSON object.",
      });
    }

    // List of required fields
    const requiredFields = [
      "loanAmount",
      "loanDuration",
      "loanPurpose",
      "loanType",
      "firstName",
      "lastName",
      "email",
      "address1",
      "city",
      "state",
      "zipCode",
      "bankName",
      "routingNumber",
      "accountNumber",
    ];

    // Check for missing critical fields
    const missing = requiredFields.filter((field) => {
      const value = data[field];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (missing.length > 0) {
      console.warn(`[WARN] Missing fields: ${missing.join(", ")}`);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.warn(`[WARN] Invalid email: ${data.email}`);
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Prepare data for email
    const applicationData = {
      requestId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    console.log(`[INFO] ${requestId} - Sending email notification...`);

    // Send email
    await sendLoanApplicationEmail(applicationData);

    console.log(`[SUCCESS] ${requestId} - Application processed successfully`);

    return res.status(200).json({
      success: true,
      message: "Loan application submitted successfully",
      requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[ERROR] ${requestId} - ${errorMessage}`, error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit loan application. Please try again.",
      requestId,
      error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}

