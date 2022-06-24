const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Subcategory = sequelize.define('Subcategory', {
    description: DataTypes.STRING,
    category: DataTypes.NUMBER,
    trip: DataTypes.STRING
});

Subcategory.belongsTo(Trip, { foreignKey: 'trip' });

module.exports = Subcategory;
