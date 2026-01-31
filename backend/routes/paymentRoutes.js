const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const hasRazorpayConfig = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

// Lazy init - only create Razorpay instance when credentials are set
let razorpay = null;
const getRazorpay = () => {
  if (!hasRazorpayConfig) return null;
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// ✅ GET RAZORPAY KEY
router.get("/get-key", (req, res) => {
  if (!hasRazorpayConfig) {
    return res.status(503).json({ key: null, error: "Payment is not configured" });
  }
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
});

// ✅ CREATE RAZORPAY ORDER
router.post("/create-order", async (req, res) => {
  const rp = getRazorpay();
  if (!rp) {
    return res.status(503).json({ success: false, message: "Payment is not configured" });
  }
  
  try {
    const { amount } = req.body;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await rp.orders.create(options);
    console.log("✅ Order created:", order);

    res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("❌ Razorpay order creation error:", err);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
});

// ✅ VERIFY RAZORPAY PAYMENT
router.post("/verify", (req, res) => {
  if (!hasRazorpayConfig) {
    return res.status(503).json({ success: false, message: "Payment is not configured" });
  }
  
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment verified successfully");
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      console.log("❌ Invalid signature");
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (err) {
    console.error("❌ Payment verification error:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: err.message,
    });
  }
});

module.exports = router;
