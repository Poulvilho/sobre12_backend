const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');
const User = require('./user');
const Subcategory = require('./subcategory');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Cost = sequelize.define('Cost', {
    description: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    category: DataTypes.NUMBER,
    subcategory: DataTypes.STRING,
    dtcost: DataTypes.DATE,
    trip: DataTypes.STRING,
    user: DataTypes.STRING,
});

Cost.hasOne(Subcategory, {foreignKey: 'subcategory'});
Cost.belongsTo(Trip, { foreignKey: 'trip' });
Cost.belongsTo(User, { foreignKey: 'user' });

module.exports = Cost;
