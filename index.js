const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/drawings', require('./routes/drawingRoutes'));

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));