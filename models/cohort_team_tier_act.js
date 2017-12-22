module.exports = (sequelize, DataTypes) => {
  const CohortTeamTierAct = sequelize.define('CohortTeamTierAct', {
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

    cohort_team_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id',
      },
    },

    repetition: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  CohortTeamTierAct.associate = (models) => {
    CohortTeamTierAct.belongsTo(models.CohortTeam);
    CohortTeamTierAct.belongsTo(models.CohortTierAct);
    CohortTeamTierAct.belongsToMany(models.CohortTierActMilestone, {
      through: models.CohortTeamTierActMilestone,
      as: 'CompletedActMilestones',
    });
  };

  return CohortTeamTierAct;
};
