const { Sequelize } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Cost = require('./cost');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Debt = sequelize.define('debts', {
    user: Sequelize.STRING,
    cost: Sequelize.STRING,
    value: Sequelize.DOUBLE,
    settled: Sequelize.BOOLEAN,
});

Debt.removeAttribute('id');

Debt.belongsTo(User, { foreignKey: 'user' });
User.hasMany(Debt, { foreignKey: 'user' });
Debt.belongsTo(Cost, { foreignKey: 'cost' });
Cost.hasMany(Debt, { foreignKey: 'cost' });

module.exports = Debt;
