let CreateCohortTierActMutation;
let Base;
let CohortTierActInput;
let CohortTierActType;

module.exports = () => [CreateCohortTierActMutation, Base, CohortTierActInput, CohortTierActType];

Base = require('../../base');
CohortTierActInput = require('../../../inputs/cohort_tier_act_input');
CohortTierActType = require('../../../types/cohort_tier_act_type');

CreateCohortTierActMutation = `
  extend type Mutation {
    createCohortTierAct(act_data: CohortTierActInput!): CohortTierAct!
  }
`;
