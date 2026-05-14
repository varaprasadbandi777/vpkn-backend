import User from '../models/User.js';

// @desc    Get all pending users
// @route   GET /api/users/pending
// @access  Private (Admin & Teacher)
export const getPendingUsers = async (req, res) => {
  try {
    let query = { isApproved: false };

    // If teacher, they can only see pending students/parents (simplified for now)
    // In a full implementation, you'd filter by class
    if (req.user.role === 'Teacher') {
      query.role = { $in: ['Student', 'Parent'] };
    }

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a user
// @route   PUT /api/users/:id/approve
// @access  Private (Admin & Teacher)
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Role-based approval restrictions
    if (req.user.role === 'Teacher' && user.role === 'Admin') {
      return res.status(403).json({ message: 'Teachers cannot approve Admins' });
    }
    
    if (req.user.role === 'Teacher' && user.role === 'Teacher') {
       // Optional: Can teachers approve other teachers? Usually no.
       return res.status(403).json({ message: 'Teachers cannot approve other Teachers' });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete/Reject a user
// @route   DELETE /api/users/:id
// @access  Private (Admin & Teacher)
export const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User request rejected and deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
