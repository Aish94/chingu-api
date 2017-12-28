let UserType;
let UserStatusEnum;
let CountryType;
let CityType;
let ProjectType;
let CohortType;
let CohortUserType;
let CohortTeamType;
let GroupType;

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

UserStatusEnum = require('../enums/user_status_enum');
CountryType = require('./country_type');
CityType = require('./city_type');
ProjectType = require('./project_type');
CohortType = require('./cohort_type');
CohortUserType = require('./cohort_user_type');
CohortTeamType = require('./cohort_team_type');
GroupType = require('./group_type');

UserType = `
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
