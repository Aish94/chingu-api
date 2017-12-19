const CityQuery = require('./city_query');
const CohortQuery = require('./cohort_query');
const CohortsQuery = require('./cohorts_query');
const CountryQuery = require('./country_query');
const GroupQuery = require('./group_query');
const ProjectsQuery = require('./projects_query');
const UserQuery = require('./user_query');

module.exports = () => [
  CityQuery,
  CohortQuery,
  CohortsQuery,
  CountryQuery,
  GroupQuery,
  ProjectsQuery,
  UserQuery,
];
