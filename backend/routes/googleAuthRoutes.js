const express = require("express");
const passport = require("../config/passport");
// const { handleGoogleAuthWithFormData } = require("../controllers/googleAuthController"); // Not used here directly

const router = express.Router();

// Helper function to get frontend URL - uses env or referer origin
const getFrontendURL = (req) => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.replace(/\/$/, "");
  }
  const referer = req.get("referer") || req.get("origin");
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.protocol}//${url.host}`;
    } catch (e) {
      // Ignore parse errors
    }
  }
  return "";
};

/**
 * @route   GET /api/auth/google/login
 * @desc    Initiate Google OAuth flow
 * @access  Public
 */
router.get("/login", (req, res, next) => {
  // Extract state parameter (contains form data from signup page)
  const state = req.query.state || null;

  // Store state in session for retrieval in callback
  if (state) {
    req.session.oauthState = state;
  }

  // Store frontend URL in session for redirect after OAuth
  const frontendUrl = getFrontendURL(req);
  req.session.frontendUrl = frontendUrl;
  console.log("🔐 Storing frontend URL for redirect:", frontendUrl);
  
  const callbackURL = process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/auth/google/callback`
    : "";
  console.log("🔗 OAuth Callback URL being sent to Google:", callbackURL);
  console.log("⚠️  This URL MUST match exactly in Google Cloud Console!");

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: state, // Pass state through OAuth flow
  })(req, res, next);
});

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback handler
 * @access  Public
 */
router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: (req, res) => {
      const frontendUrl = req.session?.frontendUrl || getFrontendURL(req) || process.env.FRONTEND_URL || "";
      return frontendUrl ? `${frontendUrl}/signup` : "/signup";
    },
    session: false,
  }),
  async (req, res) => {
    try {
      const { user, token, formData } = req.user; // formData contains name and password from signup form

      const frontendUrl = req.session?.frontendUrl || getFrontendURL(req) || process.env.FRONTEND_URL || "";

      // Log for verification
      console.log("✅ Google OAuth callback successful:", {
        userId: user.id,
        name: user.name,
        email: user.email,
        formDataReceived: !!formData,
        formName: formData?.name,
        redirectTo: frontendUrl,
      });

      // Clear session state if it exists
      if (req.session && req.session.oauthState) {
        delete req.session.oauthState;
      }
      if (req.session && req.session.frontendUrl) {
        delete req.session.frontendUrl;
      }

      const redirectURL =
        `${frontendUrl}/auth/success?token=${encodeURIComponent(token)}` +
        `&name=${encodeURIComponent(user.name)}` +
        (user.email ? `&email=${encodeURIComponent(user.email)}` : "") +
        (user.picture ? `&picture=${encodeURIComponent(user.picture)}` : "") +
        `&authProvider=${encodeURIComponent(user.authProvider)}`;

      return res.redirect(redirectURL);
    } catch (error) {
      console.error("❌ Error in Google OAuth callback:", error);
      const frontendUrl = req.session?.frontendUrl || getFrontendURL(req) || process.env.FRONTEND_URL || "";
      const errorMessage = encodeURIComponent(error.message || "Authentication failed");
      return res.redirect(frontendUrl ? `${frontendUrl}/signup?error=${errorMessage}` : `/signup?error=${errorMessage}`);
    }
  }
);

module.exports = router;
