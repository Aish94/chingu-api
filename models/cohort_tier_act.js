module.exports = (sequelize, DataTypes) => {
  const CohortTierAct = sequelize.define('CohortTierAct', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_tier_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tiers',
        key: 'id',
      },
    },

    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    order_index: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    repeatable: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  CohortTierAct.associate = (models) => {
    CohortTierAct.hasMany(models.CohortTierActMilestone, { as: 'ActMilestones' });
    CohortTierAct.hasMany(models.CohortTeamTierAct, { as: 'TeamActs' });
    CohortTierAct.belongsToMany(models.CohortTeam, {
      through: models.CohortTeamTierAct,
      as: 'Teams',
    });
    CohortTierAct.belongsTo(models.CohortTier);
  };

  return CohortTierAct;
};
