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
Debt.belongsTo(Cost, { foreignKey: 'cost' });

User.belongsToMany(Cost, { 
    through: 'debts', foreignKey: 'user',
});
Cost.belongsToMany(User, {
    through: 'debts', foreignKey: 'cost',
});

module.exports = Debt;
