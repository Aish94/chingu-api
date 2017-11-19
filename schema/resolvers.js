const jwt = require('jsonwebtoken');

const requireAdmin = (user) => {
  if (user.role !== 'admin') throw new Error('Admin Only');
};

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => username
        ? await User.findOne({ where: { username } })
        : await User.findById(user_id),

    city: async (root, { city_id }, { models: { City } }) => await City.findById(city_id),

    country: async (root, { country_id }, { models: { Country } }) => await Country.findById(country_id),

    group: async (root, { group_id }, { models: { Group } }) => await Group.findById(group_id),

    cohort: async (root, { cohort_id }, { models: { Cohort } }) => await Cohort.findById(cohort_id),

    cohorts: async (root, { limit, offset }, { models: { Cohort } }) => await Cohort.findAll({ limit, offset }),

    projects: async (root, { limit, offset }, { models: { Project } }) => await Project.findAll({ limit, offset }),
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
      const group = await Group.create({ title: `${title} Group`, group_type: 'Cohort' });
      // create Cohort
      return await Cohort.create({ title, group_id: group.id });
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

    signInUser: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ email });
      if (!user || !user.checkPassword(password)) throw new Error('Invalid email or password.');
      const payload = {
        role: user.role,
        status: user.status,
        user_id: user.id,
      };
      return {
        jwt: await jwt.sign(payload, 'SUPER_SECRET_SECRET'),
      };
    },

    createUser: async (root, { user_data, password }, { models: { User } }) => {
      const new_user = Object.assign({}, user_data, { username: undefined });
      new_user.password = await User.hashPassword(password);
      await User.create(new_user);
    },

    updateUser: async (root, { user_data }, { user }) => {
      user.email = undefined;
      if (user.status === 'pending_approval') {
        user_data.username = undefined;
      }
      return await user.update(user_data);
    },

    createCohortTeam: async (root, data, { models: { CohortTeam }, user }) => {
      requireAdmin(user);

      const cohort_team = CohortTeam.build(data);
      const team_count = CohortTeam.count({ where: { cohort_id: data.cohort_id } });
      cohort_team.title = await cohort_team.generateTitle(team_count);
      await cohort_team.save();
      await cohort_team.addProject({ title: cohort_team.title });
      return cohort_team;
    },

  },
};
