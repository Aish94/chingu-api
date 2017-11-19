// throws error if user requesting an admin mutation
const requireAdmin = user => {
  if (user.role !== 'admin') throw new Error('Admin Only');
};

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      return username
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
      return await Country.create({ name, group_id: group.id });
    }, 

    createCohort: async (root, { title }, { models: { Cohort, Group }, user }) => {
      requireAdmin(user);
      // create the Cohort Group
      const group = await Group.create({ title: `${name} Group`, group_type: 'Cohort' });
      // create Cohort
      return await Cohort.create({ title, group_id: group.id })
    },

    createCity: async (root, { country_id, name }, { models: { City, Group }, user }) => {
      requireAdmin(user);
      return await City.create({ country_id, name });
    },

    changeUserStatus: async (root, { user_id, status }, { models: { User }, user }) => {
      requireAdmin(user);
      const target_user = await User.findById(user_id);
      return await target_user.update({ status });
    },

    createCohortTeam: async (root, { cohort_id, tier }, { models: { CohortTeam, Group }, user }) => {
      requireAdmin(user);
      // create the Country Group
      const group = await Group.create({ title: `${Cohort.title} Group`, group_type: 'Country' });
      // create Country 
      return await Country.create({ name, group_id: group.id })
    }, 

    createUser: async (root, { user_data }, { models: { User } }) => {
      user_data.username = undefined;
      return await User.create(user_data);
    },

    updateUser: async (root, { user_data }, { user }) => {
      user.email = undefined;
      if(user.status == 'pending_approval') {
        user_data.username = undefined;
      }
      return await user.update(user_data);
    },

    createCohortTeam: async (root, { cohort_id, tier }, { models: { CohortTeam, Cohort, Tier, Project }, user}) => {
      requireAdmin(user);
      // get the tier title to generate the Cohort Team title
      const tierTitle = await Cohort.getTierTitle(cohort_id, tier, Tier);
      // get last team ID
      const lastTeamID = await 
      const teamTitle = await CohortTeam.generateTitle(tierTitle);
      // create the Cohort Team Project using a default title of Team Title
      const project = await Project.create({ title: teamTitle });
      // create Cohort Team
      return CohortTeam.create({ title: teamTitle, project_id: project.id, cohort_id, tier });
    },

  }
};
