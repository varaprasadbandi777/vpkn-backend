import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    console.error(`👉 ACTION REQUIRED: Please update the MONGO_URI in your backend/.env file with a valid MongoDB Atlas connection string, or a local MongoDB URI like "mongodb://127.0.0.1:27017/ctms"\n`);
    // Removing process.exit(1) so the server stays alive even if DB fails initially
  }
};

export default connectDB;
