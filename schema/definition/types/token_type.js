let TokenType;
let UserType;

module.exports = () => [TokenType, UserType];

UserType = require('./user_type');

TokenType = `
  type Token {
    user: User!
    jwt: String!
  }
`;
