const CohortTeamStandupType = require('./cohort_team_standup_type');
const CohortUserType = require('./cohort_user_type');

const CohortUserStandupType = `
  type CohortUserStandup {
    id: ID!
    team_standup: CohortTeamStandup
    user: CohortUser!
  }
`;

module.exports = () => [
  CohortUserStandupType,
  CohortTeamStandupType,
  CohortUserType,
];
