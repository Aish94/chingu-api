let CohortTeamStandupType;
let CohortUserStandupType;

module.exports = () => [CohortTeamStandupType, CohortUserStandupType];

CohortUserStandupType = require('./cohort_user_standup_type');

CohortTeamStandupType = `
  type CohortTeamStandup {
    id: ID!
    user_standups: [CohortUserStandup!]!
  }
`;
