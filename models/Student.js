import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    className: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
    },
    parentContact: {
      type: String,
    }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
