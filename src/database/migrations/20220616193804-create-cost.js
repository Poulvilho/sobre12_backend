'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('costs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      dtcost: {
        allowNull: false,
        type: Sequelize.DATE
      },
      trip: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'trips'
          },
          key: 'id'
        }
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('costs', {
      cascade: true,
    });
  }
};
