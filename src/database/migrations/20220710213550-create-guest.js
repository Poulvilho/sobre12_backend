'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guests', {
      user: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      trip: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'trips'
          },
          key: 'id'
        }
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 1,
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
    await queryInterface.dropTable('guests', {
      cascade: true,
    });
  }
};
