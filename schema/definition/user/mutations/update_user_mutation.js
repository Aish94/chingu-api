const UserInput = require('../../inputs/user_input');
const UserType = require('../../types/user_type');

const UpdateUserMutation = `
  extend type Mutation {
    updateUser(user_data: UserInput!): User!
  }
`;

module.exports = () => [UpdateUserMutation, UserInput, UserType];
