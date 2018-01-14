module.exports = (sequelize, DataTypes) => {
  const ProjectSkill = sequelize.define('ProjectSkill', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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

    skill_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'skills',
        key: 'id',
      },
    },
  });

  ProjectSkill.associate = (models) => {
    ProjectSkill.belongsTo(models.Skill);
    ProjectSkill.belongsTo(models.Project);
  };

  return ProjectSkill;
};
