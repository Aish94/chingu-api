module.exports = (sequelize, DataTypes) => {
  const CohortTeamTierActMilestone = sequelize.define('CohortTeamTierActMilestone', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_team_tier_act_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_team_tier_acts',
        key: 'id',
      },
    },

    cohort_tier_act_milestone_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tier_act_milestones',
        key: 'id',
      },
    },
  });

  CohortTeamTierActMilestone.associate = (models) => {
    CohortTeamTierActMilestone.belongsTo(models.CohortTierActMilestone);
    CohortTeamTierActMilestone.belongsTo(models.CohortTeamTierAct);
  };

  return CohortTeamTierActMilestone;
};
