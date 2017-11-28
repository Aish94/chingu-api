module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cohort_users', 'slack_user_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cohort_users', 'slack_user_id');
  },
};
