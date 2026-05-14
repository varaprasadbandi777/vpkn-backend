import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    examType: {
      type: String,
      enum: ['Midterm', 'Final', 'Assignment', 'Quiz'],
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    maxMarks: {
      type: Number,
      required: true,
      default: 100,
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

const Marks = mongoose.model('Marks', marksSchema);
export default Marks;
