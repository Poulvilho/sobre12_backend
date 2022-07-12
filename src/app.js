const express = require('express');
const cors = require('cors');

// Importing routes
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const costRoutes = require('./routes/costRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const guestRoutes = require('../src/routes/guestRoutes');
const debtRoutes = require('../src/routes/debtRoutes');

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
application.use('/api/cost', costRoutes);
application.use('/api/subcategory', subcategoryRoutes);
application.use('/api/guest', guestRoutes);
application.use('/api/debt', debtRoutes);

module.exports = application;
