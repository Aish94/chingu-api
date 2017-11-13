'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    country_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'SET DEFAULT',
      defaultValue: 1,
      foreignKey: {
        model: 'countries',
        key: 'id'
      }
    },
    city_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      foreignKey: {
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
  return User;
};
