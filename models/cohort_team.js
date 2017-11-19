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
    CohortTeam.belongsToMany(models.User, { through: models.CohortTeamUser });
    CohortTeam.belongsTo(models.Cohort);
    CohortTeam.belongsTo(models.Project);
  };

// generates a Cohort Team title based on the tier and the respective animal mapping associated with the parent Cohort
  CohortTeam.generateTitle = (cohort_id) => {
    // 
  }

  return CohortTeam;
};
