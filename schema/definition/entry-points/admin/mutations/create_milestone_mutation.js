let CreateMilestoneMutation;
let Base;
let MilestoneInput;
let MilestoneType;

module.exports = () => [CreateMilestoneMutation, Base, MilestoneInput, MilestoneType];

Base = require('../../base');
MilestoneInput = require('../../../inputs/milestone_input');
MilestoneType = require('../../../types/milestone_type');

CreateMilestoneMutation = `
  extend type Mutation {
    createMilestone(milestone_data: MilestoneInput!): Milestone!
  }
`;
