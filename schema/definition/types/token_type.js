const UserType = require('./user_type');

const TokenType = `
  type Token {
    user: User!
    jwt: String!
  }
`;

module.exports = () => [TokenType, UserType];
