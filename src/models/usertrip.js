const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const UsersTrip = sequelize.define('UsersTrip', {
    user: DataTypes.STRING,
    trip: DataTypes.STRING,
});

UsersTrip.removeAttribute('id');

UsersTrip.belongsTo(User, { foreignKey: 'user' });
UsersTrip.belongsTo(Trip, { foreignKey: 'trip'});

module.exports = UsersTrip;
