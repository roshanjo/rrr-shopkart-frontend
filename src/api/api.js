// ==================================================
// BASE URL (Loaded from Vite Environment Variable)
// ==================================================

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


// ==================================================
// GENERIC API REQUEST FUNCTION
// ==================================================

export async function apiRequest(endpoint, options = {}) {

  // ----------------------------------------------
  // Get token from browser localStorage
  // ----------------------------------------------

  const token = localStorage.getItem("token");


  // ----------------------------------------------
  // Build request headers
  // ----------------------------------------------

  const headers = {
    "Content-Type": "application/json",

    // Add Authorization header only if token exists
    ...(token && { Authorization: `Bearer ${token}` }),

    // Allow custom headers from options
    ...options.headers,
  };


  // ----------------------------------------------
  // Make the API request
  // ----------------------------------------------

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );


  // ----------------------------------------------
  // Handle Errors
  // ----------------------------------------------

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.error || "API Error"
    );
  }


  // ----------------------------------------------
  // Return JSON response
  // ----------------------------------------------

  return response.json();
}