module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohorts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    group_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: [
        'registration_open',
        'registration_closed',
        'users_accepted',
        'tiers_assigned',
        'teams_assigned',
        'ongoing',
        'ended',
      ],
      allowNull: true,
      defaultValue: null,
    },
    start_date: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    end_date: {
      allowNull: true,
      type: Sequelize.DATE,
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
  down: queryInterface => queryInterface.dropTable('cohorts'),
};
