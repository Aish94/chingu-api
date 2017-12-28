let SignInUserMutation;
let Base;
let TokenType;

module.exports = () => [SignInUserMutation, Base, TokenType];

Base = require('../../base');
TokenType = require('../../../types/token_type');

SignInUserMutation = `
  extend type Mutation {
    signInUser(email: String!, password: String!): Token!
  }
`;
