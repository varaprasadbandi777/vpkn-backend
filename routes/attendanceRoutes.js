import express from 'express';
import { markBulkAttendance, getAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAttendance);

router.route('/bulk')
  .post(protect, authorize('admin', 'teacher'), markBulkAttendance);

export default router;
