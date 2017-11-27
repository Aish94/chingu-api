module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
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
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['project_manager', 'collaborator'],
    },
  });

  ProjectUser.associate = (models) => {
    ProjectUser.belongsTo(models.User);
    ProjectUser.belongsTo(models.Project);
  };

  return ProjectUser;
};
