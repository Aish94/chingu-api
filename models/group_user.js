module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['admin', 'moderator', 'member'],
    },
  });

  GroupUser.associate = (models) => {
    GroupUser.belongsTo(models.User);
    GroupUser.belongsTo(models.Group);
  };
  return GroupUser;
};
