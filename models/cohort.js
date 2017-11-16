'use strict';
module.exports = (sequelize, DataTypes) => {
  var cohort = sequelize.define('cohort', {
    cohort_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'NOT SURE WHAT GOES HERE',
    },
    
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
      allowNull: false,
      defaultValue: 'registration_open'
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
