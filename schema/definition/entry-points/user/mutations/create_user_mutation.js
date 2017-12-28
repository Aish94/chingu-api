let CreateUserMutation;
let Base;
let UserInput;
let TokenType;

module.exports = () => [CreateUserMutation, Base, UserInput, TokenType];

Base = require('../../base');
UserInput = require('../../../inputs/user_input');
TokenType = require('../../../types/token_type');

CreateUserMutation = `
  extend type Mutation {
    createUser(user_data: UserInput!, email: String!, password: String!): Token!
  }
`;
