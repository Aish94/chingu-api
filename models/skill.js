module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });

  Skill.associate = (models) => {
    Skill.belongsToMany(models.User, {
      through: models.UserSkill,
    });
    Skill.belongsToMany(models.Project, {
      through: models.ProjectSkill,
    });
  };

  return Skill;
};
