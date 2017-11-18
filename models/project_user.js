'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProjectUser = sequelize.define('ProjectUser', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id'
      }
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['project_manager', 'collaborator']
    }
  });

  ProjectUser.associate = models => {
    ProjectUser.belongsTo(models.User);
    ProjectUser.belongsTo(models.Project);
  };

  return ProjectUser;
};
