import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// @desc    Mark attendance for multiple students
// @route   POST /api/attendance/bulk
// @access  Private (Teacher/Admin)
export const markBulkAttendance = async (req, res) => {
  try {
    const { date, className, records } = req.body;
    
    // records should be an array of { studentId, status }
    const attendancePromises = records.map(async (record) => {
      // Upsert attendance logic
      return Attendance.findOneAndUpdate(
        { student: record.studentId, date: new Date(date) },
        { 
          status: record.status, 
          markedBy: req.user._id,
          className 
        },
        { upsert: true, new: true }
      );
    });

    const results = await Promise.all(attendancePromises);
    res.status(200).json({ message: 'Attendance marked successfully', data: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance by class and date
// @route   GET /api/attendance
// @access  Private
export const getAttendance = async (req, res) => {
  try {
    const { className, date } = req.query;
    let query = {};
    
    if (className) query.className = className;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0,0,0,0);
      const endDate = new Date(date);
      endDate.setHours(23,59,59,999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await Attendance.find(query).populate({
      path: 'student',
      populate: { path: 'user', select: 'name email' }
    });
    
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
