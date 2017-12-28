let CohortInput;
let DateScalar;
let CohortStatusEnum;

module.exports = () => [CohortInput, DateScalar, CohortStatusEnum];

DateScalar = require('../scalars/date_scalar');
CohortStatusEnum = require('../enums/cohort_status_enum');

CohortInput = `
  input CohortInput {
    title: String,
    status: _CohortStatus,
    start_date: Date,
    end_date: Date
  }
`;
