import { body, param, query } from 'express-validator';

export const createProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Product name must be between 2 and 200 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Product description must be between 10 and 2000 characters'),

  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Short description cannot exceed 500 characters'),

  body('sku')
    .trim()
    .notEmpty()
    .withMessage('Product SKU is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('SKU must be between 2 and 50 characters'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('salePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),

  body('category')
    .isMongoId()
    .withMessage('Invalid category ID'),

  body('brand')
    .isMongoId()
    .withMessage('Invalid brand ID'),

  body('variants')
    .optional()
    .custom((value) => {
      // Parse JSON string if needed
      const variants = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(variants)) {
        throw new Error('Variants must be an array');
      }
      return true;
    }),

  body('variants.*.size')
    .trim()
    .notEmpty()
    .withMessage('Variant size is required'),

  body('variants.*.color')
    .trim()
    .notEmpty()
    .withMessage('Variant color is required'),

  body('variants.*.stock')
    .isInt({ min: 0 })
    .withMessage('Variant stock must be a non-negative integer'),

  body('variants.*.price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Variant price must be a positive number'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),

  body('material')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Material cannot exceed 100 characters'),

  body('careInstructions')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Care instructions cannot exceed 500 characters'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean value')
];

export const updateProductValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Product name must be between 2 and 200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Product description must be between 10 and 2000 characters'),

  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Short description cannot exceed 500 characters'),

  body('sku')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('SKU must be between 2 and 50 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('salePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),

  body('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),

  body('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid brand ID'),

  body('variants')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one product variant is required'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean value'),

  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),

  body('material')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Material cannot exceed 100 characters'),

  body('careInstructions')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Care instructions cannot exceed 500 characters')
];

export const productIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID format')
];

export const productSlugValidation = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Product slug is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Product slug must be between 1 and 200 characters')
];

export const getProductsQueryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('sort')
    .optional()
    .isString()
    .withMessage('Sort must be a string'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),

  query('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),

  query('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid brand ID'),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),

  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),

  query('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean value'),

  query('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be a boolean value')
];

export const searchProductsValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
];
