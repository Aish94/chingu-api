let CohortUserInput;
let CohortUserStatusEnum;

module.exports = () => [CohortUserInput, CohortUserStatusEnum];

CohortUserStatusEnum = require('../enums/cohort_user_status_enum');

CohortUserInput = `
  input CohortUserInput {
    status: _CohortUserStatus,
    cohort_tier_id: ID
  }
`;
