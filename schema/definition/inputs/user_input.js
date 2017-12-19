const UserInput = `
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
`;

module.exports = () => [UserInput];
