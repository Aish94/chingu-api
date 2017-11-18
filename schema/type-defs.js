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

  enum _CohortTeamUserRole {
    project_manager
    member
  }

  enum _CohortUserStatus {
    pending_approval
    rejected
    accepted
    tier_assigned
    team_assigned
  }

  type Country {
    name: String!
    users: [User!]!
    cities: [City!]!
    group: Group
  }

  type City {
    name: String!
    group: Group
    country: Country!
    users: [User!]!
  }

  type Cohort {
    title: String!
    status: _CohortStatus!
    start_date: Date
    end_date: Date
    users: [User!]!
    teams: [CohortTeam!]!
    group: Group!
  }
  
  type CohortUser {
    user: User!
    cohort: Cohort!
    status: _CohortUserStatus!
    tier: Int!
  }

  type CohortTeam {
    title: String!
    tier: Int!
    cohort: Cohort!
    project: Project!
    users: [CohortTeamUser!]!
  }

  type CohortTeamUser {
    role: _CohortTeamUserRole
    user: User!
    cohort: Cohort!
  }

  type Group {
    title: String!
    type: String!
    users: [User!]!
  }

  type Project {
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
  }

  type User {
    email: String!
    username: String!
    first_name: String!
    last_name: String!
    status: _UserStatus!
    github_url: String!
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country: Country!
    city: City
    profile_image: String
    projects: [Project!]!
    cohorts: [Cohort!]!
    cohort_teams: [CohortTeam!]!
    groups: [Group!]!
  }

  type Token {
    jwt: String!
  }

  type Query {
    user(user_id: ID!): User!
    group(group_id: ID!): Group!
    city(city_id: ID!): City!
    country(country_id: ID!): Country!
    cohort(cohort_id: ID!): Cohort!
    cohorts(size: Int = 10, last_id: Int = 0): [Cohort!]!
    projects(size: Int = 10, last_id: Int = 0): [Project!]!
  }

  type Mutation {
    createProject(title: String!): Project
  }
`;
