const { Sequelize } = require('sequelize');
const config = require('../config/database');

const Trip = require('./trip');
const User = require('./user');
const Subcategory = require('./subcategory');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Cost = sequelize.define('Cost', {
    description: Sequelize.STRING,
    value: Sequelize.DOUBLE,
    category: Sequelize.INTEGER,
    subcategory: Sequelize.STRING,
    dtcost: Sequelize.DATE,
    trip: Sequelize.STRING,
    user: Sequelize.STRING,
});

Cost.belongsTo(Subcategory, { foreignKey: 'subcategory' });
Cost.belongsTo(Trip, { foreignKey: 'trip' });
Cost.belongsTo(User, { foreignKey: 'user' });

module.exports = Cost;
