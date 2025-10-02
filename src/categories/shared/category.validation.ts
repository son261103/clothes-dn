import { body, param, query } from 'express-validator';

export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('parentCategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent category ID'),

  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer')
];

export const updateCategoryValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('parentCategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent category ID'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),

  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer')
];

export const categoryIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid category ID format')
];

export const categorySlugValidation = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Category slug is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Category slug must be between 1 and 100 characters')
];

export const getCategoriesQueryValidation = [
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

  query('parentCategory')
    .optional()
    .custom((value) => {
      if (value === 'null') return true;
      if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid parent category ID');
      }
      return true;
    }),

  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];
