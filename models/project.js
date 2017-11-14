'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    project_url: {
      allowNull: true,
      type: Sequelize.STRING
    },
    github_url: {
      allowNull: true,
      type: Sequelize.STRING
    }
  });

  Project.associate = models => {
    Project.belongsToMany(models.User, { through: models.ProjectUser });
  };

  return Project;
};
