import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('Seeding default admin user...');

    const adminEmail = 'admin@careerscope.com';
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log(`Admin user with email ${adminEmail} already exists.`);
    } else {
      // Create admin user (password will be hashed by pre-save hook)
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: 'adminpassword123',
        role: 'admin',
      });
      console.log('Default admin user successfully created!');
      console.log(`Email: ${adminEmail}`);
      console.log('Password: adminpassword123');
    }

    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed. Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
