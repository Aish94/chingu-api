module.exports = {
  Query: {
    city: async (root, { city_id }, { models: { City } }) => {
      return await City.findById(city_id);
    }, 
    country: async (root, { country_id }, { models: { Country } }) => {
      return await Country.findById(country_id);
    },
    group: async (root, { group_id }, { models: { Group } }) => {
      return await Group.findById(group_id);
    }
  },

  Mutation: {}
};
