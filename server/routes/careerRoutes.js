import express from 'express';
import {
  getCareers,
  getCareerBySlug,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';
import { validateCareer } from '../middleware/validationMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCareers);
router.get('/:slug', getCareerBySlug);

// Protected routes (Admin only)
router.post('/', protect, admin, validateCareer, createCareer);
router.put('/:id', protect, admin, validateCareer, updateCareer);
router.delete('/:id', protect, admin, deleteCareer);

export default router;
