'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('budgets', {
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
      category: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      dtbudget: {
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
    await queryInterface.dropTable('budgets', {
      cascade: true,
    });
  }
};
