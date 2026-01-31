const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { handleGoogleAuthWithFormData } = require("../controllers/googleAuthController");

const BACKEND_URL = process.env.BACKEND_URL || "";

const CALLBACK_URL = `${BACKEND_URL}/api/auth/google/callback`;

// Log the callback URL for debugging
console.log("🔗 Google OAuth Callback URL:", CALLBACK_URL);
console.log("⚠️  Make sure this URL is added to Google Cloud Console as an authorized redirect URI!");

/**
 * Google OAuth Strategy Configuration
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      passReqToCallback: true, // Enable access to req object
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Extract form data from state parameter (passed from signup page)
        // State can come from req.query.state (Google returns it) or req.session.oauthState
        let formData = null;
        let stateParam = req.query.state || (req.session && req.session.oauthState);

        if (stateParam) {
          try {
            // Decode base64 and parse JSON
            const decoded = Buffer.from(stateParam, "base64").toString("utf-8");
            formData = JSON.parse(decoded);
            console.log("✅ Form data extracted from state:", { name: formData?.name, hasPassword: !!formData?.password });
          } catch (err) {
            console.error("❌ Error parsing state:", err);
            console.error("State value:", stateParam);
          }
        } else {
          console.log("⚠️ No state parameter found in OAuth callback");
        }

        const result = await handleGoogleAuthWithFormData(profile, formData);
        return done(null, result);
      } catch (error) {
        console.error("❌ Google OAuth Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

// We are using JWTs, so serialize/deserialize are no-ops
passport.serializeUser(() => {});
passport.deserializeUser(() => {});

module.exports = passport;

