module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    country_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    city_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'cities',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['admin', 'member'],
      defaultValue: 'member',
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    username: {
      allowNull: true,
      unique: true,
      type: Sequelize.STRING,
    },
    first_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bio: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['pending_approval', 'profile_incomplete', 'profile_complete'],
      defaultValue: 'pending_approval',
    },
    github_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    linkedin_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    portfolio_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    website_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    twitter_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    blog_url: {
      allowNull: true,
      type: Sequelize.STRING,
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
};
