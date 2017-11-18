module.exports = {
  Query: {
    country: async (root, { country_id }, { models: { Country } }) => {
      return await Country.findById(country_id)
    },
  },

  Mutation: {}
};
