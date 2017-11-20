const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    country_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    city_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'cities',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      defaultValue: 'member',
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['pending_approval', 'profile_incomplete', 'profile_complete'],
      defaultValue: 'pending_approval',
    },
    bio: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    github_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    linkedin_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    portfolio_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    website_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    twitter_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    blog_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  User.hashPassword = async password => bcrypt.hash(password, 12);

  User.prototype.checkPassword = async password => bcrypt.compare(password, this.password);

  User.associate = (models) => {
    User.belongsTo(models.Country);
    User.belongsTo(models.City);

    User.hasOne(models.ProfileImage);
    User.belongsToMany(models.Project, { through: models.ProjectUser });
    User.belongsToMany(models.Cohort, { through: models.CohortUser });
    User.belongsToMany(models.CohortTeam, { through: models.CohortTeamUser });
    User.belongsToMany(models.Group, { through: models.GroupUser });
  };

  return User;
};
