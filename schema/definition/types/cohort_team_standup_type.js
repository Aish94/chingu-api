const CohortUserStandupType = require('./cohort_user_standup_type');

const CohortTeamStandupType = `
  type CohortTeamStandup {
    id: ID!
    user_standups: [CohortUserStandup!]!
  }
`;

module.exports = () => [CohortTeamStandupType, CohortUserStandupType];
