const UserInput = require('../../inputs/user_input');
const TokenType = require('../../types/token_type');

const CreateUserMutation = `
  extend type Mutation {
    createUser(user_data: UserInput!, email: String!, password: String!): Token!
  }
`;

module.exports = () => [CreateUserMutation, UserInput, TokenType];
