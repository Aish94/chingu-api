'use strict';
module.exports = (sequelize, DataTypes) => {
  var CohortTeam = sequelize.define('CohortTeam', {
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
      values: [1, 2, 3, 4]
    }
  });

  CohortTeam.associate = models => {
    CohortTeam.belongsTo(models.Cohort);
    CohortTeam.belongsTo(models.Project);
  };

  return CohortTeam;
};
