module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },

    project_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },

    github_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  Project.associate = (models) => {
    Project.belongsToMany(models.User, { through: models.ProjectUser });
    Project.belongsToMany(models.Skill, { through: models.ProjectSkill });
  };

  return Project;
};
