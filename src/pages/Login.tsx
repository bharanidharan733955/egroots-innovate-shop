import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Chrome } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Get backend URL from env or derive from current origin
  const backendUrl = (() => {
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;
    }
    const origin = window.location.origin;
    return origin.replace(/:\d+$/, "") + ":5000";
  })();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (
      !formData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/google/login`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email.trim(), formData.password);

      if (success) {
        navigate("/");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-1">
          Welcome Back
        </h2>

        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign in to continue
        </p>

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2 shadow hover:bg-gray-200 transition mb-6"
        >
          <Chrome className="w-5 h-5" /> Sign in with Google
        </button>

        <div className="relative my-6">
          <div className="border-t border-white/20" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-black px-3 text-gray-300 text-sm">
            or
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <p className="text-red-500 bg-red-500/10 p-2 rounded-lg text-center text-sm">
              {errors.general}
            </p>
          )}

          {/* Email Field */}
          <div>
            <label className="text-gray-200 text-sm">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-300 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 py-3 rounded-lg bg-black/30 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-200 text-sm">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-300 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-black/30 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg transition font-semibold shadow-lg"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-400 underline"
          >
            Sign Up
          </button>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By signing in, you agree to our{" "}
          <button
            type="button"
            onClick={() => navigate("/terms")}
            className="text-blue-400 underline"
          >
            Terms & Conditions
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
