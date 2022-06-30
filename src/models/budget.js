const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');
const Subcategory = require('./subcategory');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Budget = sequelize.define('Budget', {
    description: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    category: DataTypes.INTEGER,
    subcategory: DataTypes.STRING,
    dtbudget: DataTypes.DATE,
    trip: DataTypes.STRING
});

Budget.hasOne(Subcategory, {foreignKey: 'subcategory'});
Budget.belongsTo(Trip, { foreignKey: 'trip' });

module.exports = Budget;
