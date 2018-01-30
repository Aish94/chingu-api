let CohortUserStandupType;
let CohortTeamStandupType;
let CohortUserType;
let JSONScalar;

module.exports = () => [
  CohortUserStandupType,
  CohortTeamStandupType,
  CohortUserType,
  JSONScalar,
];

CohortTeamStandupType = require('./cohort_team_standup_type');
CohortUserType = require('./cohort_user_type');
JSONScalar = require('../scalars/json_scalar');

CohortUserStandupType = `
  type CohortUserStandup {
    id: ID!
    team_standup: CohortTeamStandup
    user: CohortUser!
    standup: JSON!
  }
`;
