module.exports = (sequelize, DataTypes) => {
  const CohortUser = sequelize.define('CohortUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    slack_user_id: {
      type: DataTypes.STRING,
      allowNull: true,
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

    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'pending_approval',
        'rejected',
        'accepted',
        'tier_assigned',
        'team_assigned',
      ],
      defaultValue: 'pending_approval',
    },
  });

  CohortUser.prototype.isAccepted = () => {
    if (this.status === 'pending_approval' || this.status === 'rejected') {
      return false;
    }
    return true;
  };

  CohortUser.associate = (models) => {
    CohortUser.belongsTo(models.User);
    CohortUser.belongsTo(models.Cohort);
    CohortUser.belongsTo(models.CohortTier);
    CohortUser.belongsToMany(models.CohortTeam, {
      through: {
        model: models.CohortTeamCohortUser,
        scope: {
          status: 'active',
        },
      },
      as: 'activeTeams',
    });
    CohortUser.belongsToMany(models.CohortTeam, {
      through: models.CohortTeamCohortUser,
      as: 'Teams',
    });
    CohortUser.hasMany(models.CohortTeamCohortUser, { as: 'TeamAssociations' });
    CohortUser.hasMany(models.CohortUserStandup, { as: 'Standups' });
  };

  return CohortUser;
};
