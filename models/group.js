'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    group_owner_type: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['City', 'Cohort', 'Country']
    }
  });

  Group.associate = models => {
    Group.hasOne(models.City);
    Group.hasOne(models.Country);
    Group.hasOne(models.Cohort);
  };

  return Group;
};
