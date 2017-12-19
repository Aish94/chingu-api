const DateScalar = require('../scalars/date_scalar');
const CohortStatusEnum = require('../enums/cohort_status_enum');
const CohortUserType = require('./cohort_user_type');
const UserType = require('./user_type');
const CohortTeamType = require('./cohort_team_type');
const ProjectType = require('./project_type');
const CountryType = require('./country_type');
const GroupType = require('./group_type');
const TierType = require('./tier_type');

const CohortType = `
  type Cohort {
    id: ID!
    title: String!
    start_date: Date
    end_date: Date
    status: _CohortStatus
    members: [CohortUser!]!
    users: [User!]!
    teams: [CohortTeam!]!
    projects: [Project!]!
    countries: [Country!]!
    group: Group!
    tiers: [Tier!]!
  }
`;

module.exports = () => [
  CohortType,
  DateScalar,
  CohortStatusEnum,
  CohortUserType,
  UserType,
  CohortTeamType,
  ProjectType,
  CountryType,
  GroupType,
  TierType,
];
