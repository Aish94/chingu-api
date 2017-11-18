module.exports = {
  Query: {
    group: async (root, { group_id }, { models: { Group } }) => {
      return await Group.findById(group_id)
    },
  },

  Mutation: {}
};
