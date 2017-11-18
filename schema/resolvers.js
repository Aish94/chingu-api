// throws error if user requesting an admin mutation 
const requireAdmin = user => { if (user.role !== 'admin') throw new Error('Admin Only'); }

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      return (username)
        ? await User.findOne({ where: { username } })
        : await User.findById(user_id);
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

    cohort: async (root, { cohort_id }, { models: { Cohort } }) => {
      return await Cohort.findById(cohort_id);
    },

    cohorts: async (root, { limit, offset }, { models: { Cohort } }) => {
      return await Cohort.findAll({ limit, offset });
    },

    projects: async (root, { limit, offset }, { models: { Project } }) => {
      return await Project.findAll({ limit, offset });
    }
  },

  Mutation: {

    createCountry: async (root, { name }, { models: { Country, Group }, user }) => {
      requireAdmin(user);
      // create the Country Group
      const group = await Group.create({ title: `${name} Group`, group_type: 'Country' });
      // create Country 
      return await Country.create({ name, group_id: group.id })
    }, 

    createCohort: async (root, { title }, { models: { Cohort, Group }, user }) => {
      requireAdmin(user);
      // create the Cohort Group
      const group = await Group.create({ title: `${name} Group`, group_type: 'Cohort' });
      // create Cohort
      return await Cohort.create({ title, group_id: group.id })
    },

    

  },

  User: {
    // custom property resolvers
    // format -> property: async...
  }
};
