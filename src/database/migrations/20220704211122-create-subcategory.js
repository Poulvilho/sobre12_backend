'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subcategories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('subcategories', {
      cascade: true,
    });
  }
};
