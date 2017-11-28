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
      defaultValue: 'Mon-Thur',
    },
  });

  CohortTeam.associate = (models) => {
    CohortTeam.hasMany(models.CohortTeamUser, { as: 'Members' });
    CohortTeam.belongsToMany(models.User, { through: models.CohortTeamUser });
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
