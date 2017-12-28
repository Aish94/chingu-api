let GetTierActsQuery;
let Base;
let CohortTierActType;

module.exports = () => [GetTierActsQuery, Base, CohortTierActType];

Base = require('../../base');
CohortTierActType = require('../../../types/cohort_tier_act_type');

GetTierActsQuery = `
  extend type Query {
    getTierActs(
      slack_team_id: String!,
      slack_channel_id: String!
    ): [CohortTierAct!]!
  }
`;
