module.exports = {
  up: queryInterface => queryInterface.addConstraint('countries', ['name'], {
    type: 'unique',
    name: 'country_name_unique_constraint',
  }),

  down: queryInterface => queryInterface.removeConstraint('countries', 'country_name_unique_constraint'),
};
