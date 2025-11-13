const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test Route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Get Razorpay Key ID
app.get('/api/razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Create Razorpay Order
app.post('/api/create-razorpay-order', async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Verify Razorpay Payment
app.post('/api/verify-razorpay-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing payment details' });
  }

  try {
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment', error: error.message });
  }
});

// Send Order Confirmation Email
app.post('/api/send-order-email', async (req, res) => {
  const { customerInfo, items, total, paymentMethod } = req.body;

  if (!customerInfo || !items || !total || !paymentMethod) {
    return res.status(400).json({ message: 'Missing order details' });
  }

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build order summary
    const orderDetails = items
      .map(
        (item) =>
          `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,               // Your email
      to: customerInfo.email,                    // Customer's email
      subject: 'Order Confirmation - Thank you for your purchase!',
      text: `
Dear ${customerInfo.name},

Thank you for your order!

Order Summary:
-----------------
${orderDetails}

Total Amount: $${total.toFixed(2)}
Payment Method: ${paymentMethod}

Shipping Address:
${customerInfo.address}

We appreciate your business!

Best regards,
Your Shop Team
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order confirmation email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
