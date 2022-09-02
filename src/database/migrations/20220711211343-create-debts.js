'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('debts', {
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
      cost: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'costs'
          },
          key: 'id'
        }
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      settled: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('debts', {
      cascade: true,
    });
  }
};
