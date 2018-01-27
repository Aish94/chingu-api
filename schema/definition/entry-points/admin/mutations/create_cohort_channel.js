let CreateCohortChannel;
let Base;
let CohortChannelType;
let CohortChannelTypeEnum;

module.exports = () => [CreateCohortChannel, Base, CohortChannelType, CohortChannelTypeEnum];

Base = require('../../base');
CohortChannelType = require('../../../types/cohort_channel_type');
CohortChannelTypeEnum = require('../../../enums/cohort_channel_type_enum');

CreateCohortChannel = `
  extend type Mutation {
    createCohortChannel(
      cohort_id: ID!,
      title: String!,
      channel_type: _CohortChannelType!
    ): CohortChannel!
  }
`;
