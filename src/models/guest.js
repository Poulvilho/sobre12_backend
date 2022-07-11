const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Guest = sequelize.define('guests', {
    user: DataTypes.STRING,
    trip: DataTypes.STRING,
});

Guest.removeAttribute('id');

Guest.belongsTo(User, { foreignKey: 'user' });
Guest.belongsTo(Trip, { foreignKey: 'trip'});

module.exports = Guest;
