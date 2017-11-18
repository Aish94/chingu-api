module.exports = {
  Query: {
    country: async (root, { country_id }, { models: { Country } }) => {
      return await Country.findById(country_id);
    },
    group: async (root, { group_id }, { models: { Group } }) => {
      return await Group.findById(group_id);
    }
  },

  Mutation: {}
};
