'use strict';
module.exports = (sequelize, DataTypes) => {
  var cohort = sequelize.define('cohort', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Cohort.hasMany(models.Cohort_User);
    Cohort.hasMany(models.Cohort_Team)
  };

  return cohort;
};
