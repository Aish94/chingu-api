'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    country_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'SET DEFAULT',
      defaultValue: 1,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    city_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'cities',
        key: 'id'
      }
    },

    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['pending_approval', 'profile_incomplete', 'profile_complete'],
      defaultValue: 'pending_approval'
    },
    github_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    linkedin_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    portfolio_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    website_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    twitter_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    blog_url: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    User.belongsTo(models.Country, {
      foreignKey: false
    });
    User.belongsTo(models.City, {
      foreignKey: true
    });

    User.hasOne(models.ProfileImage);
    User.belongsToMany(models.Project, { through: models.ProjectUser });
    User.belongsToMany(models.Cohort, { through: models.CohortUser });
    User.belongsToMany(models.CohortTeam, { through: models.CohortTeamUser });
    User.belongsToMany(models.Group, { through: models.GroupUser });
  };

  return User;
};
