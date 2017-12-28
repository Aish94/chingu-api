let UserStatus;

module.exports = () => [UserStatus];

UserStatus = `
  enum _UserStatus {
    pending_approval
    profile_incomplete
    profile_complete
  }
`;
