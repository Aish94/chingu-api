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
      allowNull: true,
      onDelete: 'SET NULL',
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
    CohortTeam.belongsToMany(models.CohortUser, { through: models.CohortTeamCohortUser });
    CohortTeam.belongsTo(models.Cohort);
    CohortTeam.belongsTo(models.CohortTier);
    CohortTeam.belongsTo(models.Project);
  };

  CohortTeam.prototype.generateTitle = async function generateTitle() {
    const team_count = await CohortTeam.count({ where: { cohort_id: this.cohort_id } });
    const cohort_tier = await this.getCohortTier();
    const tier = await cohort_tier.getTier();
    this.title = `${tier.title}-team-${team_count}`;
  };

  CohortTeam.prototype.getNextMilestones = async function getNextMilestone() {
    const team_acts = await sequelize.models.CohortTeamTierAct.findAll({
      include: ['CohortTierAct'],
      order: [['CohortTierAct', 'order_index', 'ASC'], ['repetition', 'ASC'], ['created_at', 'ASC']],
      where: { cohort_team_id: this.id },
    });

    // Handle the case in which the team hasn't completed any milestones.
    if (!team_acts.length) {
      const tier = await this.getCohortTier();
      const tier_acts = await tier.getActs({
        order: [['order_index', 'ASC']],
        limit: 1,
      });
      return tier_acts[0].getActMilestones({
        order: [['order_index', 'ASC']],
        limit: 1,
      });
    }

    // Team has progressed beyond the first act and milestone.
    const last_team_act = team_acts[team_acts.length - 1];
    const current_act = await last_team_act.getCohortTierAct();
    const current_act_milestones = await current_act.getActMilestones({
      order: [['order_index', 'DESC']],
    });

    const completed_milestones = await last_team_act.getCompletedActMilestones({
      order: [['order_index', 'ASC'], ['created_at', 'ASC']],
    });
    const last_completed_milestone = completed_milestones[completed_milestones.length - 1];

    // If the team hasn't completed an act, return the next milestone in the act.
    if (last_completed_milestone.order_index < current_act_milestones[0].order_index) {
      return [current_act_milestones.find(
        milestone => milestone.order_index === last_completed_milestone.order_index + 1,
      )];
    }

    // The team is either progressing to the next act or has completed all acts.
    const tier = await current_act.getCohortTier();
    const tier_acts = await tier.getActs({
      order: [['order_index', 'DESC']],
    });

    // Team is between one act and the next.
    if (current_act.order_index < tier_acts[0].order_index) {
      const next_act = tier_acts.find(
        act => act.order_index === current_act.order_index + 1,
      );
      const next_act_milestones = await next_act.getActMilestones({
        order: [['order_index', 'ASC']],
      });

      // Team is at the end of a repeatable act.
      // Add the first milestone of the repeatable act to the list of potential
      // next milestones.
      const next_milestones = [];
      if (current_act.repeatable) {
        next_milestones.push(current_act_milestones[current_act_milestones.length - 1]);
      }

      // Add the first milestone of the next act to the array and return it.
      next_milestones.push(next_act_milestones[0]);
      return next_milestones;
    }

    // Team has completed all acts and milestones so return an empty array to
    // signal completion.
    return [];
  };

  return CohortTeam;
};
