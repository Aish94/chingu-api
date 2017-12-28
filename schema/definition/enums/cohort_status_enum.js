let CohortStatusEnum;

module.exports = () => [CohortStatusEnum];

CohortStatusEnum = `
  enum _CohortStatus {
    registration_open
    registration_closed
    users_accepted
    tiers_assigned
    teams_assigned
    ongoing
    ended
  }
`;
