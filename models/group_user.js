'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroupUser = sequelize.define('GroupUser', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },

    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'groups',
        key: 'id'
      }
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['admin', 'moderator', 'member']
    }
  });

  GroupUser.associate = models => {
    GroupUser.belongsTo(models.User);
    GroupUser.belongsTo(models.Group);
  };
  return GroupUser;
};
