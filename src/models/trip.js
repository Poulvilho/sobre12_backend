const { Sequelize } = require('sequelize');
const config = require('../config/database');

const User = require('./user');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Trip = sequelize.define('Trip', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    dtstart: Sequelize.DATE,
    dtend: Sequelize.DATE,
    user: Sequelize.STRING,
});

Trip.belongsTo(User, { foreignKey: 'user' });

module.exports = Trip;
