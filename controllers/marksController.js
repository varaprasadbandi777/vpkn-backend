import Marks from '../models/Marks.js';

// @desc    Add marks for a student
// @route   POST /api/marks
// @access  Private (Teacher/Admin)
export const addMarks = async (req, res) => {
  try {
    const { student, subject, examType, marksObtained, maxMarks } = req.body;

    const newMarks = await Marks.create({
      student,
      subject,
      examType,
      marksObtained,
      maxMarks,
      enteredBy: req.user._id,
    });

    res.status(201).json(newMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get marks for a student
// @route   GET /api/marks/:studentId
// @access  Private
export const getMarksByStudent = async (req, res) => {
  try {
    const marks = await Marks.find({ student: req.params.studentId }).populate({
      path: 'student',
      populate: { path: 'user', select: 'name email' }
    });
    
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
