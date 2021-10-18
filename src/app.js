const express = require('express');
const cors = require('cors');

// Importing routes
const userRoutes = require('./routes/userRoutes');

const application = express();

// Static resources setup
application.use(express.static('public'));

application.use(cors()); // Development only

// Content-Type will be application/json, (this MUST come before application routes)
application.use(express.json());

// Routes middleware configuration
application.use('/api/users', userRoutes);

module.exports = application;
