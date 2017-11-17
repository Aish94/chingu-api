'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group_User = sequelize.define('Group_User', {
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
      values: [
        'admin', 
        'moderator',
        'member'
      ]
    }
  });

  Group_User.associate = models => {
    Group_User.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    
    Group_User.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Group_User;
};
