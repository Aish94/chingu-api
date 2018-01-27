let CohortUserStandupType;
let CohortTeamStandupType;
let CohortUserType;
let CohortUserStandupTypeEnum;
let JSONScalar;

module.exports = () => [
  CohortUserStandupType,
  CohortTeamStandupType,
  CohortUserType,
  CohortUserStandupTypeEnum,
  JSONScalar,
];

CohortTeamStandupType = require('./cohort_team_standup_type');
CohortUserType = require('./cohort_user_type');
CohortUserStandupTypeEnum = require('../enums/cohort_user_standup_type_enum');
JSONScalar = require('../scalars/json_scalar');

CohortUserStandupType = `
  type CohortUserStandup {
    id: ID!
    team_standup: CohortTeamStandup
    user: CohortUser!
    standup_type: _CohortUserStandupType!
    standup: JSON!
  }
`;
