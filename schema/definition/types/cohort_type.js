let CohortType;
let CohortChannelType;
let DateScalar;
let CohortStatusEnum;
let CohortUserType;
let UserType;
let CohortTeamType;
let ProjectType;
let CountryType;
let GroupType;
let TierType;

module.exports = () => [
  CohortType,
  CohortChannelType,
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

CohortChannelType = require('./cohort_channel_type');
DateScalar = require('../scalars/date_scalar');
CohortStatusEnum = require('../enums/cohort_status_enum');
CohortUserType = require('./cohort_user_type');
UserType = require('./user_type');
CohortTeamType = require('./cohort_team_type');
ProjectType = require('./project_type');
CountryType = require('./country_type');
GroupType = require('./group_type');
TierType = require('./tier_type');

CohortType = `
  type Cohort {
    id: ID!
    title: String!
    start_date: Date
    end_date: Date
    status: _CohortStatus
    members: [CohortUser!]!
    users: [User!]!
    teams: [CohortTeam!]!
    channels: [CohortChannel!]!
    projects: [Project!]!
    countries: [Country!]!
    group: Group!
    tiers: [Tier!]!
  }
`;
