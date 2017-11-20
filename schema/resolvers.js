const jwt = require('jsonwebtoken');
const { loadConfigFile } = require('../config/utilities');
const { adminRequired, loginRequired, getLoggedInUser } = require('../config/auth');

const { JWT_SECRET } = loadConfigFile('config');

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      if (username) await User.findOne({ where: { username } });
      else await User.findById(user_id);
    },

    city: async (root, { city_id }, { models: { City } }) => City.findById(city_id),

    country: async (root, { country_id }, { models: { Country } }) => Country.findById(country_id),

    group: async (root, { group_id }, { models: { Group } }) => Group.findById(group_id),

    cohort: async (root, { cohort_id }, { models: { Cohort } }) => Cohort.findById(cohort_id),

    cohorts: async (root, { limit, offset }, { models: { Cohort } }) => Cohort.findAll({ limit, offset }),

    projects: async (root, { limit, offset }, { models: { Project } }) => Project.findAll({ limit, offset }),
  },

  Mutation: {
    createCountry: async (root, { name }, { models: { Country, Group }, jwt_object }) => {
      adminRequired(jwt_object);
      // create the Country Group
      const group = await Group.create({ title: `${name} Group`, group_type: 'Country' });
      // create Country
      await Country.create({ name, group_id: group.id });
    },

    createCohort: async (root, { title }, { models: { Cohort, Group }, jwt_object }) => {
      adminRequired(jwt_object);
      // create the Cohort Group
      const group = await Group.create({ title: `${title} Group`, group_type: 'Cohort' });
      // create Cohort
      await Cohort.create({ title, group_id: group.id });
    },

    createCity: async (root, { country_id, name }, { models: { City }, jwt_object }) => {
      adminRequired(jwt_object);
      await City.create({ country_id, name });
    },

    changeUserStatus: async (root, { user_id, status }, { models: { User }, jwt_object }) => {
      adminRequired(jwt_object);
      const target_user = await User.findById(user_id);
      await target_user.update({ status });
    },

    createCohortTeam: async (root, data, { models: { CohortTeam }, jwt_object }) => {
      adminRequired(jwt_object);

      const cohort_team = CohortTeam.build(data);
      const team_count = CohortTeam.count({ where: { cohort_id: data.cohort_id } });
      cohort_team.title = await cohort_team.generateTitle(team_count);
      await cohort_team.save();
      await cohort_team.addProject({ title: cohort_team.title });
      return cohort_team;
    },

    signInUser: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ email });
      if (!user || !user.checkPassword(password)) throw new Error('Invalid email or password.');
      const payload = {
        user_role: user.role,
        user_status: user.status,
        user_id: user.id,
      };
      return {
        jwt: await jwt.sign(payload, JWT_SECRET),
      };
    },

    createUser: async (root, { user_data, password }, { models: { User } }) => {
      const new_user = Object.assign({}, user_data, { username: undefined });
      new_user.password = await User.hashPassword(password);
      return User.create(new_user);
    },

    updateUser: async (root, { user_data }, { jwt_object }) => {
      const user = getLoggedInUser(loginRequired(jwt_object));

      const updated_user = Object.assign({}, user_data, {
        username: user.status === 'pending_approval' ? undefined : user_data.username,
        email: undefined,
      });
      await user.update(updated_user);
    },

  },

  User: {
    groups: root => root.getGroups(),
    cohorts: root => root.getCohorts(),
    assignCohortTeamUser: async (root, data, { models: { CohortTeamUser }, user }) => {
      adminRequired(user);
      await CohortTeamUser.create(data);
    },
  },
};
