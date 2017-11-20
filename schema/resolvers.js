const jwt = require('jsonwebtoken');
const { loadConfigFile } = require('../config/utilities');
const { adminRequired, loginRequired, getLoggedInUser } = require('../config/auth');

const { JWT_SECRET } = loadConfigFile('config');

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User } }) => {
      if (username) return User.findOne({ where: { username } });
      return User.findById(user_id);
    },

    city: async (root, { city_id }, { models: { City } }) => City.findById(city_id),

    country: async (root, { country_id }, { models: { Country } }) => Country.findById(country_id),

    group: async (root, { group_id }, { models: { Group } }) => Group.findById(group_id),

    cohort: async (root, { cohort_id }, { models: { Cohort } }) => Cohort.findById(cohort_id),

    cohorts: async (root, data, { models: { Cohort } }) => Cohort.findAll(data),

    projects: async (root, data, { models: { Project } }) => Project.findAll(data),
  },

  Mutation: {
    createCountry: async (root, { name }, { models: { Country, Group }, jwt_object }) => {
      adminRequired(jwt_object);
      const group = await Group.create({ title: `${name} Group`, group_type: 'Country' });
      return Country.create({ name, group_id: group.id });
    },

    createCity: async (root, { country_id, name }, { models: { City }, jwt_object }) => {
      adminRequired(jwt_object);
      return City.create({ country_id, name });
    },

    createCohort: async (root, { title }, { models: { Cohort, Group }, jwt_object }) => {
      adminRequired(jwt_object);
      const group = await Group.create({ title: `${title} Group`, group_type: 'Cohort' });
      return Cohort.create({ title, group_id: group.id });
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

    assignCohortTeamUser: async (root, data, { models: { CohortTeamUser }, jwt_object }) => {
      adminRequired(jwt_object);
      return CohortTeamUser.create(data);
    },

    changeUserStatus: async (root, { user_id, status }, { models: { User }, jwt_object }) => {
      adminRequired(jwt_object);
      const target_user = await User.findById(user_id);
      return target_user.update({ status });
    },

    signInUser: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ email });
      if (!user || !user.checkPassword(password)) throw new Error('Invalid email or password.');
      return {
        jwt: await jwt.sign({
          user_role: user.role,
          user_status: user.status,
          user_id: user.id,
        }, JWT_SECRET),
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
        username: (user.status === 'pending_approval' ? undefined : user_data.username),
        email: undefined,
      });
      return user.update(updated_user);
    },
  },

  User: {
    country: root => root.getCountry(),
    city: root => root.getCity(),
    projects: root => root.getProjects(),
    cohorts: root => root.getCohorts(),
    cohort_teams: root => root.getCohortTeams(),
    groups: root => root.getGroups(),
  },

  Country: {
    users: root => root.getUsers(),
    cities: root => root.getCities(),
    group: root => root.getGroup(),
  },

  Group: {
    users: root => root.getUsers(),
  }, 
  
  Cohort: {
    users: root => root.getUsers(),
    teams: root => root.getCohortTeams(),
    group: root => root.getGroups(),
  },

  CohortUser: {
    user: root => root.getUser(),
    cohort: root => root.getCohort(),
  },

  CohortTeam: {
    cohort: root => root.getCohort(),
    project: root => root.getProject(),
    users: root => root.getUsers(),
  },

};
