const UserStatusEnum = require('../enums/user_status_enum');
const CountryType = require('./country_type');
const CityType = require('./city_type');
const ProjectType = require('./project_type');
const CohortType = require('./cohort_type');
const CohortUserType = require('./cohort_user_type');
const CohortTeamType = require('./cohort_team_type');
const GroupType = require('./group_type');

const UserType = `
  type User {
    id: ID!
    email: String!
    username: String
    first_name: String!
    last_name: String!
    status: _UserStatus!
    bio: String
    github_url: String!
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country: Country
    city: City
    profile_image: String
    projects: [Project!]!
    cohorts: [Cohort!]!
    cohort_users: [CohortUser!]!
    teams: [CohortTeam!]!
    groups: [Group!]!
  }
`;

module.exports = () => [
  UserType,
  UserStatusEnum,
  CountryType,
  CityType,
  ProjectType,
  CohortType,
  CohortUserType,
  CohortTeamType,
  GroupType,
];
