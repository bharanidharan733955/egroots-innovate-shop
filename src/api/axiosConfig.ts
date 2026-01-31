import axios from "axios";

// Dynamically determine the backend URL based on env and current origin
const getBackendURL = () => {
  // In development mode, use proxy (empty baseURL since paths already include /api)
  if (import.meta.env.MODE === "development") {
    return ""; // Empty because all API calls already include /api prefix
  }

  // Use env variable if set
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // Fallback: use same protocol and host as current origin, port 5000
  const currentOrigin = window.location.origin;
  return `${currentOrigin.replace(/:\d+$/, "")}:5000`;
};

const baseURL = getBackendURL();

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add response interceptor to handle token expiration
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data
      const token = localStorage.getItem("token");
      if (token) {
        // Only clear if we had a token (means it expired)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        // Dispatch event to notify AuthContext
        window.dispatchEvent(new CustomEvent("token-expired"));
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
