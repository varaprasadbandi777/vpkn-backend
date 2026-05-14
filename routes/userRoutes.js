import express from 'express';
import { getPendingUsers, approveUser, rejectUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pending', protect, authorize('Admin', 'Teacher'), getPendingUsers);
router.put('/:id/approve', protect, authorize('Admin', 'Teacher'), approveUser);
router.delete('/:id', protect, authorize('Admin', 'Teacher'), rejectUser);

export default router;
