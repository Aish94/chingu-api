let UpdateUserStatusMutation;
let Base;
let UserStatusEnum;
let UserType;

module.exports = () => [UpdateUserStatusMutation, Base, UserStatusEnum, UserType];

Base = require('../../base');
UserStatusEnum = require('../../../enums/user_status_enum');
UserType = require('../../../types/user_type');

UpdateUserStatusMutation = `
  extend type Mutation {
    updateUserStatus(user_id: ID!, status: _UserStatus!): User!
  }
`;
