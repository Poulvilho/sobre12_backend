const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const User = require('./user');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    dtstart: DataTypes.DATE,
    dtend: DataTypes.DATE,
    user: DataTypes.STRING,
});

Trip.belongsTo(User, { foreignKey: 'user' });
Trip.belongsToMany(User, { 
    through: 'guests', foreignKey: 'trip', as: 'guest',
});

User.belongsToMany(Trip, {
    through: 'guests', foreignKey: 'user', as: 'sharedTrip',
});

module.exports = Trip;
