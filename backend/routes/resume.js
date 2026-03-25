import express from 'express';
import {
  createResume,
  getResume,
  getMyResume,
  generateSummary,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', protect, createResume);
router.get('/user/me', protect, getMyResume);
router.get('/:id', protect, getResume);
router.post('/summary', protect, generateSummary);

export default router;