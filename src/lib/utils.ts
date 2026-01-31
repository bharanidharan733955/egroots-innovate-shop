import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the backend URL dynamically based on env and current origin
 */
export function getBackendURL(): string {
  // In development mode, use proxy
  if (import.meta.env.MODE === "development") {
    return "/api";
  }

  // Use env variable if set
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // Fallback: same protocol and host as current origin, port 5000
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  return currentOrigin.replace(/:\d+$/, "") + ":5000";
}
