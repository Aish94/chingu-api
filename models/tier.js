'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tier = sequelize.define('Tier', {
    level: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
  });

  Tier.associate = models => {
    Tier.belongsToMany(models.Cohort, { through: models.CohortTier });
  };

  return Tier;
};