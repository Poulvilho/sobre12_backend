const express = require('express');
const cors = require('cors');

// Importing routes
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const application = express();

// Static resources setup
application.use(express.static('public'));

application.use(cors()); // Development only

// Content-Type will be application/json, (this MUST come before application routes)
application.use(express.json());

// Routes middleware configuration
application.use('/api/user', userRoutes);
application.use('/api/trip', tripRoutes);
application.use('/api/budget', budgetRoutes);

module.exports = application;
