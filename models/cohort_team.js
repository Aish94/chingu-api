'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cohort_team = sequelize.define('Cohort_team', {
    cohort_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id'
      }
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id'
      }
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    tier: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        1,
        2,
        3,
        4
      ],
    }
  });

  Cohort_Team.associate = models => {
    Cohort_team.belongsTo(models.Cohort, {
      foreignKey: {
        allowNull: false
      }
    });

    Cohort_team.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    }); 
  }

  return cohort_team;
};
