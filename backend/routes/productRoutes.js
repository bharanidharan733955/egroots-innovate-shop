const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Validation rules for product creation/update
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['3D Printing Kits', 'PCB Design Services', 'Educational Kits', 'Competition Robots'])
    .withMessage('Invalid category'),
  body('image')
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('reviewCount')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Review count must be a non-negative integer'),
  body('stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer')
];

// Routes
router.route('/')
  .get(getProducts)
  .post(productValidation, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(productValidation, updateProduct)
  .delete(deleteProduct);

module.exports = router;