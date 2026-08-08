import { body, validationResult } from 'express-validator';

// Generic middleware to run validation rules and catch validation errors
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation rules for Registration
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateResult,
];

// Validation rules for Login
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateResult,
];

// Validation rules for Category creation/update
export const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .trim(),
  body('icon')
    .optional()
    .trim(),
  validateResult,
];

// Validation rules for Career creation/update
export const validateCareer = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Career title is required'),
  body('overview')
    .trim()
    .notEmpty()
    .withMessage('Overview description is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Category must be a valid MongoDB ID'),
  body('responsibilities')
    .isArray({ min: 1 })
    .withMessage('Responsibilities must be an array with at least one item'),
  body('technicalSkills')
    .isArray({ min: 1 })
    .withMessage('Technical skills must be an array with at least one item'),
  body('softSkills')
    .isArray({ min: 1 })
    .withMessage('Soft skills must be an array with at least one item'),
  body('tools')
    .isArray({ min: 1 })
    .withMessage('Tools must be an array with at least one item'),
  body('education')
    .trim()
    .notEmpty()
    .withMessage('Education requirements are required'),
  body('roadmap')
    .isArray({ min: 1 })
    .withMessage('Roadmap steps must be an array with at least one step'),
  body('roadmap.*.step')
    .isInt({ min: 1 })
    .withMessage('Each roadmap step must contain a step number starting at 1'),
  body('roadmap.*.title')
    .trim()
    .notEmpty()
    .withMessage('Each roadmap step must contain a step title'),
  body('roadmap.*.description')
    .trim()
    .notEmpty()
    .withMessage('Each roadmap step must contain a step description'),
  body('salary.min')
    .isNumeric()
    .withMessage('Minimum salary must be a number'),
  body('salary.max')
    .isNumeric()
    .withMessage('Maximum salary must be a number'),
  body('salary.median')
    .isNumeric()
    .withMessage('Median salary must be a number'),
  body('learningDuration')
    .trim()
    .notEmpty()
    .withMessage('Learning duration details are required'),
  body('difficulty')
    .trim()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),
  validateResult,
];
