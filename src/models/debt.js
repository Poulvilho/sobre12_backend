const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Cost = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Debt = sequelize.define('debts', {
    user: DataTypes.STRING,
    cost: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    settled: DataTypes.BOOLEAN,
});

Debt.removeAttribute('id');

Debt.belongsTo(User, { foreignKey: 'user' });
Debt.belongsTo(Cost, { foreignKey: 'cost' });

module.exports = Debt;
