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
    CohortTeamTierAct.belongsTo(models.CohortTeam, { as: 'Team' });
    CohortTeamTierAct.belongsTo(models.CohortTierAct, { as: 'Act' });
    CohortTeamTierAct.belongsToMany(models.CohortTierActMilestone, {
      through: models.CohortTeamTierActMilestones,
      as: 'CompletedActMilestones',
    });
  };

  return CohortTeamTierAct;
};
