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
    category: DataTypes.INTEGER,
    subcategory: DataTypes.STRING,
    dtcost: DataTypes.DATE,
    trip: DataTypes.STRING,
    user: DataTypes.STRING,
});

Cost.belongsTo(Subcategory, {foreignKey: 'subcategory'});
Cost.belongsTo(Trip, { foreignKey: 'trip' });
Cost.belongsTo(User, { foreignKey: 'user' });

Cost.belongsToMany(User, { 
    through: 'users_costs', foreignKey: 'cost', as: 'partipant',
});

User.belongsToMany(Cost, {
    through: 'users_costs', foreignKey: 'user', as: 'sharedCost',
});

module.exports = Cost;
