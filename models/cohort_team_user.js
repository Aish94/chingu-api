'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cohort_Team_User = sequelize.define('Cohort_Team_User', {
    cohort_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id'
      }
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },

    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        'project_manager',
        'member'
      ]
    }
  });

  Cohort_Team_User.associate = models => {
    Cohort_Team_User.belongsTo(models.Cohort_Team, {
      foreignKey: {
        allowNull: false
      }
    });

    Cohort_Team_User.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Cohort_Team_User;
};
