const jwt = require('jsonwebtoken');
const { loadConfigFile } = require('../config/utilities');
const { adminRequired, loginRequired, getLoggedInUser } = require('../config/auth');

const { JWT_SECRET } = loadConfigFile('config');

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User }, jwt_object }) => {
      if (username) return User.findOne({ where: { username } });
      else if (user_id) return User.findById(user_id);
      return getLoggedInUser(loginRequired(jwt_object));
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

    createCohortTeam: async (root, data, { models: { CohortTeam, Project }, jwt_object }) => {
      adminRequired(jwt_object);
      const cohort_team = CohortTeam.build(data);
      const team_count = await CohortTeam.count({ where: { cohort_id: data.cohort_id } });
      cohort_team.title = await cohort_team.generateTitle(team_count);
      const project = await Project.create({ title: cohort_team.title });
      cohort_team.project_id = project.id;
      return cohort_team.save();
    },

    assignCohortUser: async (root, data, { models: { CohortUser }, jwt_object }) => {
      adminRequired(jwt_object);
      return CohortUser.create(data);
    },

    updateCohortUserStatus: async (
      root,
      { cohort_user_id, status },
      { models: { CohortUser },
      jwt_object },
    ) => {
      adminRequired(jwt_object);
      const cohort_user = await CohortUser.findById(cohort_user_id);
      return cohort_user.update({ status });
    },

    assignCohortTeamUser: async (root, data, { models: { CohortTeamUser }, jwt_object }) => {
      adminRequired(jwt_object);
      return CohortTeamUser.create(data);
    },

    createTier: async (root, data, { models: { Tier }, jwt_object }) => {
      adminRequired(jwt_object);
      return Tier.create(data);
    },

    linkTier: async (root, data, { models: { CohortTier }, jwt_object }) => {
      adminRequired(jwt_object);
      return CohortTier.create(data);
    },

    changeUserStatus: async (root, { user_id, status }, { models: { User }, jwt_object }) => {
      adminRequired(jwt_object);
      const target_user = await User.findById(user_id);
      return target_user.update({ status });
    },

    signInUser: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !await user.checkPassword(password)) throw new Error('Invalid email or password.');
      return {
        user,
        jwt: await jwt.sign({
          user_role: user.role,
          user_status: user.status,
          user_id: user.id,
        }, JWT_SECRET),
      };
    },

    createUser: async (root, { user_data, email, password }, { models: { User } }) => {
      const new_user = Object.assign({}, user_data, { email });
      new_user.password = await User.hashPassword(password);
      return User.create(new_user);
    },

    updateUser: async (root, { user_data }, { jwt_object }) => {
      const user = await getLoggedInUser(loginRequired(jwt_object));
      return user.update(user_data);
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

  City: {
    group: root => root.getGroup(),
    country: root => root.getCountry(),
    users: root => root.getUsers(),
  },

  Project: {
    users: root => root.getUsers(),
  },

  Group: {
    users: root => root.getUsers(),
    type: root => root.group_type,
  },

// getCohortTeams() = alias => getTeams()
  Cohort: {
    users: root => root.getUsers(),
    teams: root => root.getTeams(),
    group: root => root.getGroups(),
    tiers: root => root.getTiers(),
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

  CohortTeamUser: {
    user: root => root.getUser(),
    cohort: root => root.getCohort(),
  },
};
