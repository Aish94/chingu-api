module.exports = `
  scalar Date

  enum _user_status {
    pending_approval
    profile_incomplete
    profile_complete
  }

  enum _cohort_status {
    registration_open
    registration_closed
    users_accepted
    tiers_assigned
    teams_assigned
    ongoing
    ended
  }

  enum _cohort_team_user_role {
    project_manager
    member
  }

  type Country {
    name: String!
    users: [User!]!
    city: City
    group: Group!
  }

  type City {
    name: String!
    group: Group!
    country: Country!
    users: [User!]!
  }

  type Cohort {
    title: String!
    status: _cohort_status!
    start_date: Date
    end_date: Date
    users: [User!]!
    teams: [CohortTeam!]!
    group: Group!
  }
  
  type CohortUser {
    placeholder: String!
  }

  type CohortTeam {
    title: String!
    tier: _cohort_team_tier!
    cohort: Cohort!
    project: Project!
    users: [CohortTeamUser!]!
  }

  type CohortTeamUser {
    role: _cohort_team_user_role
    user: User!
    cohort: Cohort!
  }

  type Group {
    title: String!
    owner: String!
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
    status: _user_status!
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

  type Query {
    projects(size: Int): [Project!]!
  }

  type Mutation {
    createProject(title: String!): Project
  }
`;
