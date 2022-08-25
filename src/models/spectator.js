const { Sequelize } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Spectator = sequelize.define('spectators', {
    user: Sequelize.STRING,
    trip: Sequelize.STRING,
    spectated: Sequelize.STRING,
});

Spectator.removeAttribute('id');

Spectator.belongsTo(User, { foreignKey: 'user' });
Spectator.belongsTo(User, { foreignKey: 'spectated' });
Spectator.belongsTo(Trip, { foreignKey: 'trip'});

Trip.belongsToMany(User, { 
    through: 'spectators', foreignKey: 'trip', as: 'spectator',
});
User.belongsToMany(Trip, {
    through: 'spectators', foreignKey: 'user', as: 'spectatedTrip',
});

module.exports = Spectator;
