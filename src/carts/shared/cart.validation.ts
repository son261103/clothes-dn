import { body } from 'express-validator';

export const addToCartValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('variant.size')
    .trim()
    .notEmpty()
    .withMessage('Product size is required'),

  body('variant.color')
    .trim()
    .notEmpty()
    .withMessage('Product color is required'),

  body('quantity')
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100')
];

export const updateCartItemValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('variant.size')
    .trim()
    .notEmpty()
    .withMessage('Product size is required'),

  body('variant.color')
    .trim()
    .notEmpty()
    .withMessage('Product color is required'),

  body('quantity')
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100')
];

export const removeFromCartValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('variant.size')
    .trim()
    .notEmpty()
    .withMessage('Product size is required'),

  body('variant.color')
    .trim()
    .notEmpty()
    .withMessage('Product color is required')
];
