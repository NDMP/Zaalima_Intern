require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
  }

  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail }).select('+password');

  if (existingUser) {
    existingUser.name = name;
    existingUser.role = 'SUPER_ADMIN';
    existingUser.isActive = true;
    existingUser.password = password;
    await existingUser.save();
    console.log(`Admin updated: ${normalizedEmail}`);
  } else {
    await User.create({
      name,
      email: normalizedEmail,
      password,
      role: 'SUPER_ADMIN',
      isActive: true,
    });
    console.log(`Admin created: ${normalizedEmail}`);
  }
};

createAdmin()
  .catch((error) => {
    console.error(`Admin migration failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
