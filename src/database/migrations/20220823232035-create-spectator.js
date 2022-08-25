'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('spectators', {
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
      spectated: {
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
    await queryInterface.dropTable('spectators', {
      cascade: true,
    });
  }
};
