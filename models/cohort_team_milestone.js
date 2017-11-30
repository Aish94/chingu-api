module.exports = (sequelize, DataTypes) => {
  const CohortTeamMilestone = sequelize.define('CohortTeamMilestone', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_team_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
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

  CohortTeamMilestone.associate = (models) => {
    CohortTeamMilestone.belongsTo(models.CohortTierActMilestone);
    CohortTeamMilestone.belongsTo(models.CohortTeam);
  };

  return CohortTeamMilestone;
};
