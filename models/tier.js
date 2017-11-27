module.exports = (sequelize, DataTypes) => {
  const Tier = sequelize.define('Tier', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    level: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });

  Tier.associate = (models) => {
    Tier.belongsToMany(models.Cohort, { through: models.CohortTier });
  };

  return Tier;
};
