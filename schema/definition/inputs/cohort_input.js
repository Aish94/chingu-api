const DateScalar = require('../scalars/date_scalar');
const CohortStatusEnum = require('../enums/cohort_status_enum');

const CohortInput = `
  input CohortInput {
    title: String,
    status: _CohortStatus,
    start_date: Date,
    end_date: Date
  }
`;

module.exports = () => [CohortInput, DateScalar, CohortStatusEnum];
