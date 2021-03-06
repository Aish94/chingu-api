module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('group_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    group_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['admin', 'moderator', 'member'],
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    uniqueKeys: [{
      name: 'group_users_user-group_unique_index',
      singleField: false,
      fields: ['user_id', 'group_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('group_users'),
};
