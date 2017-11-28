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

    standup_schedule: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Mon-Thur',
    },
  });

  CohortTier.associate = (models) => {
    CohortTier.belongsTo(models.Cohort);
    CohortTier.belongsTo(models.Tier);
    CohortTier.hasMany(models.CohortTeam, { as: 'Teams' });
    CohortTier.hasMany(models.CohortUser, { as: 'Users' });
  };

  return CohortTier;
};
