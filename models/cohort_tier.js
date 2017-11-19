'use strict';
module.exports = (sequelize, DataTypes) => {
  var CohortTier = sequelize.define('CohortTier', {
    cohort_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id'
      }
    },
    tier_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'tiers',
        key: 'id'
      }
    },
  });

  CohortTier.associate = models => {
    CohortTier.belongsTo(models.Cohort);
    CohortTier.belongsTo(models.Tier);
  }

  return CohortTier;
};