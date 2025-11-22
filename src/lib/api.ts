// On Vercel, use relative paths for API calls (same domain)
// In development, use VITE_API_URL or default to localhost
const getApiBaseUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  // In production on Vercel, use relative paths
  if (import.meta.env.PROD) {
    return "";
  }
  // In development, default to localhost
  return "http://localhost:3001";
};

const API_BASE_URL = getApiBaseUrl();

interface ApiResponse<T = any> {
  success?: boolean;
  message: string;
  data?: T;
  requestId?: string;
  timestamp?: string;
}

const handleResponse = async (response: Response): Promise<any> => {
  const contentType = response.headers.get("content-type");
  const isJSON = contentType && contentType.includes("application/json");
  
  let data;
  try {
    data = isJSON ? await response.json() : await response.text();
  } catch (error) {
    console.error("Failed to parse response:", error);
    throw new Error("Invalid response from server");
  }

  // Handle success responses
  if (response.ok) {
    return data;
  }

  // Handle error responses
  const errorMessage = typeof data === "string" 
    ? data 
    : data?.message || `Request failed with status ${response.status}`;
  
  console.error("API Error:", {
    status: response.status,
    statusText: response.statusText,
    message: errorMessage,
    data,
  });

  throw new Error(errorMessage);
};

export const submitLoanApplication = async (payload: Record<string, unknown>) => {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/loan-application` : "/api/loan-application";
  
  console.log("Submitting loan application to:", url);
  console.log("Payload:", payload);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await handleResponse(response);
    console.log("Application submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Loan application submission error:", error);
    throw error;
  }
};

export const checkApiHealth = async (): Promise<{ status: string }> => {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/health` : "/api/health";
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};
