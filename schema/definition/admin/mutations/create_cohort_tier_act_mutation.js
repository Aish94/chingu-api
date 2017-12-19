const CohortTierActInput = require('../../inputs/cohort_tier_act_input');
const CohortTierActType = require('../../types/cohort_tier_act_type');

const CreateCohortTierActMutation = `
  extend type Mutation {
    createCohortTierAct(act_data: CohortTierActInput!): CohortTierAct!
  }
`;

module.exports = () => [CreateCohortTierActMutation, CohortTierActInput, CohortTierActType];
