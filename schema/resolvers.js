module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      return await username ? User.findOne({ where: { username } }) : User.findById(user_id)
    }
  },

  Mutation: {

  },

  User: {
    // custom property resolvers
      // format -> property: async...
  }
};
