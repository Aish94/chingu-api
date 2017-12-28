let CohortUserStandupType;
let CohortTeamStandupType;
let CohortUserType;

module.exports = () => [
  CohortUserStandupType,
  CohortTeamStandupType,
  CohortUserType,
];

CohortTeamStandupType = require('./cohort_team_standup_type');
CohortUserType = require('./cohort_user_type');

CohortUserStandupType = `
  type CohortUserStandup {
    id: ID!
    team_standup: CohortTeamStandup
    user: CohortUser!
  }
`;
