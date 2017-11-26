module.exports = (sequelize, DataTypes) => {
  const ProfileImage = sequelize.define('ProfileImage', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    storage_bucket: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  ProfileImage.associate = (models) => {
    ProfileImage.belongsTo(models.User);
  };

  return ProfileImage;
};
