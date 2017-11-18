'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profile_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },

      storage_bucket: {
        type: Sequelize.STRING,
        allowNull: true
      },
      path: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_processed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profile_images');
  }
};
