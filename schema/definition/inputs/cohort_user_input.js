const CohortUserStatusEnum = require('../enums/cohort_user_status_enum');

const CohortUserInput = `
  input CohortUserInput {
    status: _CohortUserStatus,
    cohort_tier_id: Int
  }
`;

module.exports = () => [CohortUserInput, CohortUserStatusEnum];
