module.exports = (sequelize, DataTypes) => {
  const CohortTierActMilestone = sequelize.define('CohortTierActMilestone', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_tier_act_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tier_acts',
        key: 'id',
      },
    },

    milestone_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'milestones',
        key: 'id',
      },
    },

    order_index: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  CohortTierActMilestone.associate = (models) => {
    CohortTierActMilestone.belongsTo(models.CohortTierAct);
    CohortTierActMilestone.belongsTo(models.Milestone);
  };

  return CohortTierActMilestone;
};
