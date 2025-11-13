const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('API is running!');
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
