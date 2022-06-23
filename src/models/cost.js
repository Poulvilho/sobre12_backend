const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');
const User = require('./user');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Cost = sequelize.define('Cost', {
    description: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    category: DataTypes.NUMBER,
    dtcost: DataTypes.DATE,
    trip: DataTypes.STRING,
    user: DataTypes.STRING,
});

Cost.belongsTo(Trip, { foreignKey: 'trip' });
Cost.belongsTo(User, { foreignKey: 'user' });

module.exports = Cost;
