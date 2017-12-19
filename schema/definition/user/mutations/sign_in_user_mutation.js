const TokenType = require('../../types/token_type');

const SignInUserMutation = `
  extend type Mutation {
    signInUser(email: String!, password: String!): Token!
  }
`;

module.exports = () => [SignInUserMutation, TokenType];
