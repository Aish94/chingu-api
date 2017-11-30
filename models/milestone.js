module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define('Milestone', {
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

    resource_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  Milestone.associate = (models) => {
    Milestone.belongsToMany(models.CohortTierAct, {
      through: models.CohortTierActMilestone,
      as: 'Acts',
    });
  };

  return Milestone;
};
