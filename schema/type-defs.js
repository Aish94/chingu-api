module.exports = `
  enum _userStatus {
    pending_approval
    profile_incomplete
    profile_complete
  }

  type Country {
    title: String!
    description: String
  }

  type City {
    title: String!
    description: String
  }

  type Cohort {
    title: String!
    description: String
  } 

  type CohortTeam {
    title: String!
    description: String
  }

  type Group {
    title: String!
    description: String
  }

  type Project {
    title: String!
    description: String
    project_url: String
    github_url: String
  }

  type User {
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    status: _userStatus!
    githubURL: String!
    linkedinURL: String
    portfolioURL: String
    websiteURL: String
    twitterURL: String
    blogURL: String
    country: Country!
    city: City
    profileImage: String
    projects: [Project!]!
    cohorts: [Cohort!]!
    cohortTeams: [CohortTeam!]!
    groups: [Group!]!
  }

  type Query {
    projects(size: Int): [Project!]!
  }

  type Mutation {
    createProject(title: String!): Project
  }
`;
