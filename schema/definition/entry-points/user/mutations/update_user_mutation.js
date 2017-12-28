let UpdateUserMutation;
let Base;
let UserInput;
let UserType;

module.exports = () => [UpdateUserMutation, Base, UserInput, UserType];

Base = require('../../base');
UserInput = require('../../../inputs/user_input');
UserType = require('../../../types/user_type');

UpdateUserMutation = `
  extend type Mutation {
    updateUser(user_data: UserInput!): User!
  }
`;
