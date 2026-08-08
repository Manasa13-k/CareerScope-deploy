import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes with validation
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Protected routes
router.get('/me', protect, getUserProfile);

export default router;
