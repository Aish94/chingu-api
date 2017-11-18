module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      return (await username)
        ? User.findOne({ where: { username } })
        : User.findById(user_id);
    },
    city: async (root, { city_id }, { models: { City } }) => {
      return await City.findById(city_id);
    },
    country: async (root, { country_id }, { models: { Country } }) => {
      return await Country.findById(country_id);
    },
    group: async (root, { group_id }, { models: { Group } }) => {
      return await Group.findById(group_id);
    },
    projects: async (root, { limit, offset }, { models: { Project } }) => {
      return await Project.findAll({ limit, offset });
    }
  },

  Mutation: {},

  User: {
    // custom property resolvers
    // format -> property: async...
  }
};
