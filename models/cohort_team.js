module.exports = (sequelize, DataTypes) => {
  const CohortTeam = sequelize.define('CohortTeam', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    cohort_tier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tiers',
        key: 'id',
      },
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id',
      },
    },

    slack_channel_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    standup_schedule: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1,4',
    },
  });

  CohortTeam.associate = (models) => {
    CohortTeam.hasMany(models.CohortTeamCohortUser, { as: 'Members' });
    CohortTeam.hasMany(models.CohortTeamStandup, { as: 'Standups' });
    CohortTeam.hasMany(models.CohortTeamTierAct, { as: 'TeamActs' });
    CohortTeam.belongsToMany(models.CohortUser, {
      through: models.CohortTeamCohortUser,
      as: 'CohortUsers',
    });
    CohortTeam.belongsTo(models.Cohort);
    CohortTeam.belongsTo(models.CohortTier);
    CohortTeam.belongsTo(models.Project);
  };

  CohortTeam.prototype.generateTitle = async function generateTitle() {
    const team_count = await CohortTeam.count({ where: { cohort_id: this.cohort_id } });
    const cohort = await this.getCohort();
    const tier_title = (await cohort.getTiers({ where: { level: this.tier } }))[0].title;
    this.title = `${tier_title}-team-${team_count}`;
  };

  return CohortTeam;
};
