const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder
} = require('../controllers/orderController');

const router = express.Router();

// Validation rules for order creation
const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Item name is required'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Item price must be a positive number'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Item quantity must be at least 1'),
  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  body('customerInfo.name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Customer name must be between 1 and 50 characters'),
  body('customerInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('customerInfo.phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('paymentMethod')
    .isIn(['Credit/Debit Card', 'UPI', 'Razorpay'])
    .withMessage('Invalid payment method')
];

// Routes
router.route('/')
  .get(getOrders)
  .post(orderValidation, createOrder);

router.route('/:id')
  .get(getOrder)
  .put(updateOrder);

module.exports = router;