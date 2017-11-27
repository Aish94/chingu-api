module.exports = (sequelize, DataTypes) => {
  const CohortTier = sequelize.define('CohortTier', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },
    tier_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'tiers',
        key: 'id',
      },
    },
  });

  CohortTier.associate = (models) => {
    CohortTier.belongsTo(models.Cohort);
    CohortTier.belongsTo(models.Tier);
    CohortTier.hasMany(models.CohortTeam);
    CohortTier.hasMany(models.CohortUser);
  };

  return CohortTier;
};
