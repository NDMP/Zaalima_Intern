const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    if (process.env.MONGODB_DNS_SERVERS) {
      dns.setServers(
        process.env.MONGODB_DNS_SERVERS.split(',').map((server) => server.trim()),
      );
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`, {
      cause: error,
    });
  }
};

module.exports = connectDB;
