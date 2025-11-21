import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { sendLoanApplicationEmail } from "./emailService.js";

const app = express();
const port = process.env.PORT || 3001;

// Parse environment variables
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Add localhost origins for development
const isDevelopment = process.env.NODE_ENV !== "production";
const defaultDevOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:8081",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

const allAllowedOrigins = isDevelopment 
  ? [...new Set([...allowedOrigins, ...defaultDevOrigins])]
  : allowedOrigins;

console.log(`[INFO] Starting Loan API Server...`);
console.log(`[INFO] Port: ${port}`);
console.log(`[INFO] Environment: ${process.env.NODE_ENV || "development"}`);
console.log(`[INFO] Allowed Origins: ${allAllowedOrigins.join(", ") || "All (development)"}`);

// Middleware Setup
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "5mb" })); // Increased from 1mb
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // In development, allow all localhost origins
    if (isDevelopment && (origin.includes("localhost") || origin.includes("127.0.0.1"))) {
      return callback(null, true);
    }

    // Check against allowed origins list
    if (allAllowedOrigins.length === 0 || allAllowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[WARN] CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  exposedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
}));

// Explicit OPTIONS handler for preflight requests
app.options("*", cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === "/health", // Skip rate limit for health check
});

app.use(limiter);

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Test Endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working correctly",
    timestamp: new Date().toISOString(),
  });
});

// Main Loan Application Endpoint
app.post("/api/loan-application", async (req, res) => {
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    console.log(`[REQUEST] ${requestId} - Loan application received`);

    const data = req.body;

    // Validate payload
    if (!data || typeof data !== "object") {
      console.warn("[WARN] Invalid payload type");
      return res.status(400).json({ 
        success: false,
        message: "Invalid payload. Expected JSON object." 
      });
    }

    // List of required fields (flexible - some can be empty)
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
    const missing = requiredFields.filter(field => {
      const value = data[field];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (missing.length > 0) {
      console.warn(`[WARN] Missing fields: ${missing.join(", ")}`);
      return res.status(400).json({ 
        success: false,
        message: `Missing required fields: ${missing.join(", ")}` 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.warn(`[WARN] Invalid email: ${data.email}`);
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
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
    
    res.status(200).json({ 
      success: true,
      message: "Loan application submitted successfully",
      requestId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[ERROR] ${requestId} - ${errorMessage}`, error);
    
    res.status(500).json({ 
      success: false,
      message: "Failed to submit loan application. Please try again.",
      requestId,
      error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
});

// Webhook Endpoint (for future integrations)
app.post("/api/webhook", async (req, res) => {
  try {
    console.log("[INFO] Webhook received:", req.body);
    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("[ERROR] Webhook error:", error);
    res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
});

// 404 Handler
app.use((req, res) => {
  console.warn(`[WARN] 404 - Not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    success: false,
    message: "Endpoint not found",
    path: req.path,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[ERROR] Unhandled error:", err);
  
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || "Internal server error",
  });
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("[INFO] SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("[INFO] Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("[INFO] SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("[INFO] Server closed");
    process.exit(0);
  });
});

// Start Server
const server = app.listen(port, () => {
  console.log(`[SUCCESS] ✅ Loan API Server is running on port ${port}`);
  console.log(`[INFO] Health Check: http://localhost:${port}/health`);
  console.log(`[INFO] Endpoint: http://localhost:${port}/api/loan-application`);
});
