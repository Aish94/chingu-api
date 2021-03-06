module.exports = `
  scalar Date

  enum _UserStatus {
    pending_approval
    profile_incomplete
    profile_complete
  }

  enum _CohortStatus {
    registration_open
    registration_closed
    users_accepted
    tiers_assigned
    teams_assigned
    ongoing
    ended
  }

  enum _CohortTeamCohortUserRole {
    project_manager
    member
  }

  enum _CohortTeamCohortUserStatus {
    active
    removed
    reassigned
  }

  enum _CohortUserStatus {
    pending_approval
    rejected
    accepted
    tier_assigned
    team_assigned
  }

  type Country {
    id: ID!
    name: String!
    users: [User!]!
    cities: [City!]!
    group: Group
  }

  type City {
    id: ID!
    name: String!
    group: Group
    country: Country!
    users: [User!]!
  }

  type Cohort {
    id: ID!
    title: String!
    status: _CohortStatus
    start_date: Date
    end_date: Date
    members: [CohortUser!]!
    users: [User!]!
    teams: [CohortTeam!]!
    projects: [Project!]!
    countries: [Country!]!
    group: Group!
    tiers: [Tier!]!
  }

  type Wizard {
    slack_team_id: String!
    slack_team_token: String!
    bot_id: String!
    bot_token: String!
    bot_secret: String!
    cohort: Cohort
  }

  type CohortTier {
    id: ID!
    cohort: Cohort!
    tier: Tier!
    teams: [CohortTeam!]!
    users: [CohortUser!]!
    acts: [CohortTierAct!]!
  }

  type Milestone {
    id: ID!
    title: String!
    description: String
    resource_url: String
    acts: [CohortTierAct!]!
  }

  type CohortTierAct {
    id: ID!
    title: String!
    order_index: Int!
    repeatable: Boolean!
    cohort_tier: CohortTier!
    act_milestones: [CohortTierActMilestone!]!
    teams: [CohortTeam!]!
    team_acts: [CohortTeamTierAct!]!
  }

  type CohortTierActMilestone {
    id: ID!
    order_index: Int!
    act: CohortTierAct!
    milestone: Milestone!
    team_acts: [CohortTeamTierAct!]!
  }

  type CohortTeamTierActMilestone {
    id: ID!
    team_act: CohortTeamTierAct!
    act_milestone: CohortTierActMilestone!
  }

  type Tier {
    id: ID!
    level: Int!
    title: String!
  }
  
  type CohortUser {
    id: ID!
    user: User!
    cohort: Cohort!
    status: _CohortUserStatus!
    tier: Tier
    team: CohortTeam
    slack_user_id: String 
    standups: [CohortUserStandup!]!
  }

  type CohortTeamTierAct {
    id: ID!
    repetition: Int!
    team: CohortTeam!
    act: CohortTierAct!
    completed_act_milestones: [CohortTierActMilestone!]!
  }

  type CohortTeam {
    id: ID!
    title: String!
    slack_channel_id: String!
    cohort: Cohort!
    project: Project!
    tier: Tier!
    members: [CohortTeamCohortUser!]!
    cohort_users: [CohortUser!]!
    standups: [CohortTeamStandup!]!
    team_acts: [CohortTeamTierAct!]!
  }

  type CohortUserStandup {
    id: ID!
    team_standup: CohortTeamStandup
    user: CohortUser!
  }

  type CohortTeamStandup {
    id: ID!
    user_standups: [CohortUserStandup!]!
  }

  type CohortTeamCohortUser {
    id: ID!
    role: _CohortTeamCohortUserRole
    status: _CohortTeamCohortUserStatus
    cohort_user: CohortUser!
    cohort_team: CohortTeam!
  }

  type Group {
    id: ID!
    title: String!
    type: String!
    users: [User!]!
  }

  type Project {
    id: ID!
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    username: String
    first_name: String!
    last_name: String!
    status: _UserStatus!
    bio: String
    github_url: String!
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country: Country
    city: City
    profile_image: String
    projects: [Project!]!
    cohorts: [Cohort!]!
    cohort_users: [CohortUser!]!
    teams: [CohortTeam!]!
    groups: [Group!]!
  }

  type Token {
    user: User!
    jwt: String!
  }

  type Query {
    wizard(slack_team_id: String!): Wizard
    cohortTeam(slack_team_id: String!, slack_channel_id: String!): CohortTeam!
    cohortTeams(slack_team_id: String!): [CohortTeam!]!

    getNextMilestone(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
    ): [CohortTierActMilestone!]!

    getTierActs(
      slack_team_id: String!,
      slack_channel_id: String!
    ): [CohortTierAct!]!

    user(username: String, user_id: ID): User
    group(group_id: ID!): Group
    city(city_id: ID!): City
    country(country_id: ID!): Country
    cohort(cohort_id: ID!): Cohort
    cohorts(limit: Int = 10, offset: Int = 0): [Cohort!]!
    projects(limit: Int = 10, offset: Int = 0): [Project!]!
  }

  input WizardInput {
    slack_team_id: String
    slack_team_token: String
    bot_id: String
    bot_token: String
    cohort_id: Int
  }

  input UserInput {
    first_name: String
    last_name: String
    github_url: String
    bio: String
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country_id: ID
    city_id: ID
  }

  input CohortInput {
    title: String,
    status: _CohortStatus,
    start_date: Date,
    end_date: Date
  }

  input CohortUserInput {
    status: _CohortUserStatus,
    cohort_tier_id: Int
  }
  
  input CohortTierActInput {
    cohort_id: Int
    tier_id: Int
    title: String
    order_index: Int
    repeatable: Boolean
  }

  input MilestoneInput {
    title: String
    description: String
    resource_url: String
  }
  
  input CohortTierActMilestoneInput {
    cohort_tier_act_id: Int
    milestone_id: Int
    order_index: Int  
  }

  type Mutation {
    createWizard(wizard_data: WizardInput!): Wizard!
    integrateWizardWithCohort(
      slack_team_id: String!,
      cohort_id: Int!,
      bot_secret: String!
    ): Wizard!
    registerCohortTeamCohortUser(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!,
      email_base: String!
      role: _CohortTeamCohortUserRole!
    ): CohortTeamCohortUser!
    unregisterCohortTeamCohortUser(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
      admin_slack_user_id: String!
    ): CohortTeamCohortUser!
    wizardCreateCohortTeam(
      slack_team_id: String!,
      title: String!,
      slack_channel_id: String!
      slack_user_id: String!
    ): CohortTeam!
    submitMilestone(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!,
      cohort_tier_act_milestone_id: Int!
    ): CohortTeamTierActMilestone!

    addUsersToCohort(cohort_id: Int!, user_data: String!): [CohortUser!]!
    createCountry(name: String!): Country!
    createCity(country_id: ID!, name: String!): City!
    updateUserStatus(user_id: ID!, status: _UserStatus!): User!
    createTier(level: Int!, title: String!): Tier!
    createCohort(title: String!, cohort_data: CohortInput): Cohort!
    updateCohort(cohort_id: ID!, cohort_data: CohortInput!): Cohort!
    addTierToCohort(cohort_id: ID!, tier_id: ID!): CohortTier!
    updateCohortUser(cohort_user_id: ID!, cohort_user_data: CohortUserInput!): CohortUser!
    createCohortTeam(cohort_id: ID!, cohort_tier_id: Int!): CohortTeam!
    addUserToCohortTeam(
      cohort_team_id: ID!,
      cohort_user_id: ID!,
      role: _CohortTeamCohortUserRole!
    ): CohortTeamCohortUser!

    createMilestone(milestone_data: MilestoneInput!): Milestone!
    createCohortTierAct(act_data: CohortTierActInput!): CohortTierAct!
    createCohortTierActMilestone(
      act_milestone_data: CohortTierActMilestoneInput!
    ): CohortTierActMilestone!
    
    createUser(user_data: UserInput!, email: String!, password: String!): Token!
    signInUser(email: String!, password: String!): Token!
    updateUser(user_data: UserInput!): User!
    joinCohort(cohort_id: ID!): CohortUser!
  }
`;
