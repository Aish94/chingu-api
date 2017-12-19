const MilestoneInput = require('../../inputs/milestone_input');
const MilestoneType = require('../../types/milestone_type');

const CreateMilestoneMutation = `
  extend type Mutation {
    createMilestone(milestone_data: MilestoneInput!): Milestone!
  }
`;

module.exports = () => [CreateMilestoneMutation, MilestoneInput, MilestoneType];
