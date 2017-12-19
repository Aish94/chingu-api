const UserStatusEnum = require('../../enums/user_status_enum');
const UserType = require('../../types/user_type');

const UpdateUserStatusMutation = `
  extend type Mutation {
    updateUserStatus(user_id: ID!, status: _UserStatus!): User!
  }
`;

module.exports = () => [UpdateUserStatusMutation, UserStatusEnum, UserType];
