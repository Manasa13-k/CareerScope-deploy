import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5s selection timeout for Atlas
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.warn(`⚠️ Primary MongoDB Connection Failed: ${error.message}`);
      console.warn('🔄 Switching to in-memory MongoDB fallback...');
    }
  }

  try {
    mongoMemoryServer = await MongoMemoryServer.create();
    const mongoUri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Memory Server Connected: ${conn.connection.host} (Local Fallback)`);
    return true;
  } catch (memError) {
    console.error(`❌ Could not start MongoDB Memory Server: ${memError.message}`);
    return false;
  }
};

export default connectDB;
