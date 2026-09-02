require('dotenv').config();

const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const devRoutes = require('./routes/devRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const corsOptions = process.env.CLIENT_URL
  ? { origin: process.env.CLIENT_URL }
  : { origin: false };

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.use('/api/dev', devRoutes);
}

app.use(errorHandler);

module.exports = app;
