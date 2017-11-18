module.exports = {
  Query: {
    city: async (root, { city_id }, { models: { City } }) => {
      return await city.findById(city_id)
    }, 
  },

  Mutation: {}
};
