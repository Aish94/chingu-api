'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cohort = sequelize.define('Cohort', {
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id'
      }
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM,
      values: [
        'registration_open',
        'registration_closed',
        'users_accepted',
        'tiers_assigned',
        'teams_assigned',
        'ongoing',
        'ended'
      ],
      allowNull: true,
      defaultValue: null
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Cohort.associate = models => {
    Cohort.belongsToMany(models.Tier, { through: models.CohortTier });
    Cohort.belongsToMany(models.User, { through: models.CohortUser });
    Cohort.hasMany(models.CohortTeam);
    Cohort.belongsTo(models.Group);
  };

// returns the Tier title associated with the Cohort Team tier
  Cohort.getTierTitle = async (cohort_id, tier, Tier) => {
    return await Cohort.findOne({
      where: { id: cohort_id }, 
      include: {
        model: Tier, 
        where: { level: tier },
        attributes: 'title'
      }
    });
  };

  return Cohort;
};
