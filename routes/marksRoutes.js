import express from 'express';
import { addMarks, getMarksByStudent } from '../controllers/marksController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'teacher'), addMarks);

router.route('/:studentId')
  .get(protect, getMarksByStudent);

export default router;
