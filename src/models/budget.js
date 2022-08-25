const { Sequelize } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');
const Subcategory = require('./subcategory');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Budget = sequelize.define('Budget', {
    description: Sequelize.STRING,
    value: Sequelize.DOUBLE,
    category: Sequelize.INTEGER,
    subcategory: Sequelize.STRING,
    dtbudget: Sequelize.DATE,
    trip: Sequelize.STRING
});

Budget.belongsTo(Subcategory, { foreignKey: 'subcategory' });
Budget.belongsTo(Trip, { foreignKey: 'trip' });

module.exports = Budget;
