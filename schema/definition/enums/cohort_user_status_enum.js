let CohortUserStatus;

module.exports = () => [CohortUserStatus];

CohortUserStatus = `
  enum _CohortUserStatus {
    pending_approval
    rejected
    accepted
    tier_assigned
    team_assigned
  }
`;
