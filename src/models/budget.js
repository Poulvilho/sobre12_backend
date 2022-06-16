const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Budget = sequelize.define('Budget', {
    description: DataTypes.STRING,
    value:DataTypes.DOUBLE,
    dtbudget: DataTypes.DATE,
    trip: DataTypes.STRING
});

Budget.belongsTo(Trip, { foreignKey: 'trip' });

module.exports = Budget;
