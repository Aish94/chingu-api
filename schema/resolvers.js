module.exports = {
  Query: {
    user: async (root, data, context) => {
      return await someAsyncFunc();
    }
  },

  Mutation: {}
};
