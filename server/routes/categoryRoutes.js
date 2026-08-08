import express from 'express';
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/validationMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Protected routes (Admin only)
router.post('/', protect, admin, validateCategory, createCategory);
router.put('/:id', protect, admin, validateCategory, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
