const { checkUserPermissions, getLoggedInUser } = require('../config/auth');

const requireAdmin = async (jwt_object) => {
  const user = await getLoggedInUser(jwt_object);
  return checkUserPermissions(user, { role: 'admin ' });
};

module.exports = {
  Query: {
    user: async (root, { username, user_id }, { models: { User }, jwt_object }) => {
      if (username) return User.findOne({ where: { username } });
      else if (user_id) return User.findById(user_id);
      return getLoggedInUser(jwt_object);
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
      requireAdmin(jwt_object);
      const group = await Group.create({ title: `${name} Group`, group_type: 'Country' });
      return Country.create({ name, group_id: group.id });
    },

    createCity: async (root, { country_id, name }, { models: { City }, jwt_object }) => {
      requireAdmin(jwt_object);
      return City.create({ country_id, name });
    },

    updateUserStatus: async (root, { user_id, status }, { models: { User }, jwt_object }) => {
      requireAdmin(jwt_object);
      const target_user = await User.findById(user_id);
      return target_user.update({ status });
    },

    createTier: async (root, data, { models: { Tier }, jwt_object }) => {
      requireAdmin(jwt_object);
      return Tier.create(data);
    },

    createCohort: async (root, { title }, { models: { Cohort, Group }, jwt_object }) => {
      requireAdmin(jwt_object);
      const group = await Group.create({ title: `${title} Group`, group_type: 'Cohort' });
      return Cohort.create({ title, group_id: group.id });
    },

    updateCohort: async (root, { cohort_id, cohort_data }, { models: { Cohort }, jwt_object }) => {
      requireAdmin(jwt_object);
      const cohort = await Cohort.findById(cohort_id);
      return cohort.update(cohort_data);
    },

    addTierToCohort: async (root, data, { models: { CohortTier }, jwt_object }) => {
      requireAdmin(jwt_object);
      return CohortTier.create(data);
    },

    updateCohortUser: async (
      root,
      { cohort_user_id, cohort_user_data },
      { models: { CohortUser },
      jwt_object },
    ) => {
      requireAdmin(jwt_object);
      const cohort_user = await CohortUser.findById(cohort_user_id);
      return cohort_user.update(cohort_user_data);
    },

    createCohortTeam: async (root, data, { models: { CohortTeam, Project }, jwt_object }) => {
      requireAdmin(jwt_object);
      const cohort_team = CohortTeam.build(data);
      await cohort_team.generateTitle();
      const project = await Project.create({ title: cohort_team.title });
      cohort_team.project_id = project.id;
      return cohort_team.save();
    },

    addUserToCohortTeam: async (
      root,
      { user_id, cohort_team_id, role },
      { models: { CohortUser, CohortTeamUser, CohortTeam, ProjectUser },
      jwt_object,
    }) => {
      requireAdmin(jwt_object);
      const cohort_team = await CohortTeam.findById(cohort_team_id);
      const cohort_user = await CohortUser.findOne({
        where: { user_id, cohort_id: cohort_team.cohort_id },
      });
      if (!cohort_user || !cohort_user.isAccepted()) throw new Error('User is not accepted in cohort.');
      await ProjectUser.create({
        user_id,
        project_id: cohort_team.project_id,
        role: cohort_team.role === 'project_manager' ? 'project_manager' : 'collaborator',
      });
      return CohortTeamUser.create({ user_id, cohort_team_id, role });
    },

    signInUser: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !await user.checkPassword(password)) throw new Error('Invalid email or password.');
      return {
        user,
        jwt: `Bearer ${await user.signIn()}`,
      };
    },

    createUser: async (root, { user_data, email, password }, { models: { User } }) => {
      const new_user = Object.assign({}, user_data, { email });
      new_user.password = await User.hashPassword(password);
      const user = await User.create(new_user);
      return {
        user,
        jwt: `Bearer ${await user.signIn()}`,
      };
    },

    updateUser: async (root, { user_data }, { jwt_object }) => {
      const user = await getLoggedInUser(jwt_object);
      return user.update(user_data);
    },

    joinCohort: async (root, { cohort_id }, { models: { Cohort, CohortUser }, jwt_object }) => {
      const user = checkUserPermissions(
        await getLoggedInUser(jwt_object),
        { status: 'profile_incomplete' },
      );
      const cohort = await Cohort.findById(cohort_id);
      if (cohort.status !== 'registration_open') throw new Error('Registration is not open.');
      return CohortUser.create({ cohort_id, user_id: user.id });
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

  Cohort: {
    members: root => root.getMembers(),
    users: root => root.getUsers(),
    teams: root => root.getTeams(),
    projects: root => root.getProjects(),
    countries: root => root.getUsers().map(user => user.getCountry()),
    group: root => root.getGroups(),
    tiers: root => root.getTiers(),
  },

  CohortTier: {
    cohort: root => root.getCohort(),
    tier: root => root.getTier(),
    teams: root => root.getTeams(),
    users: root => root.getUsers(),
    acts: root => root.getActs(),
  },

  Milestone: {
    acts: root => root.getActs(),
  },

  CohortTierAct: {
    cohort_tier: root => root.getCohortTier(),
    act_milestones: root => root.getActMilestones(),
    teams: root => root.getTeams(),
    team_acts: root => root.getTeamActs(),
  },

  CohortTierActMilestone: {
    act: root => root.getAct(),
    milestone: root => root.getMilestone(),
    team_acts: root => root.getTeamActs(),
  },

  CohortTeamTierActMilestone: {
    team: root => root.getTeam(),
    team_act: root => root.getTeamAct(),
    act_milestone: root => root.getActMilestone(),
  },

  CohortUser: {
    user: root => root.getUser(),
    cohort: root => root.getCohort(),
    standups: root => root.getStandups(),
  },

  CohortTeamTierAct: {
    team: root => root.getTeam(),
    act: root => root.getAct(),
    completed_act_milestones: root => root.getCompletedActMilestones(),
  },

  CohortTeam: {
    cohort: root => root.getCohort(),
    project: root => root.getProject(),
    cohort_tier: root => root.getCohortTier(),
    members: root => root.getMembers(),
    standups: root => root.getStandups(),
    team_acts: root => root.getTeamActs(),
  },

  CohortUserStandup: {
    team_standup: root => root.getCohortTeamStandup(),
    user: root => root.getCohortUser(),
  },

  CohortTeamStandup: {
    user_standups: root => root.getUserStandups(),
  },

  CohortTeamUser: {
    user: root => root.getUser(),
    cohort: root => root.getCohort(),
  },
};
