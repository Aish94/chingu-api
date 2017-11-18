'use strict';
module.exports = (sequelize, DataTypes) => {
  var CohortUser = sequelize.define('CohortUser', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    cohort_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id'
      }
    },

    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'pending_approval',
        'rejected',
        'accepted',
        'tier_assigned',
        'team_assigned'
      ],
      defaultValue: 'pending_approval'
    },
    tier: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [1, 2, 3, 4]
    }
  });

  CohortUser.associate = models => {
    CohortUser.belongsTo(models.User);
    CohortUser.belongsTo(models.Cohort);
  };

  return CohortUser;
};
