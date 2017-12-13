const { Op } = require('sequelize');
const {
  checkUserPermissions,
  getLoggedInUser,
  requireWizard,
  requireSlackAdmin,
  requireAdmin,
} = require('../config/auth');

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

    wizard: async (root, { slack_team_id }, { models: { Wizard }, is_wizard }) => {
      requireWizard(is_wizard);
      return Wizard.findOne({ where: { slack_team_id } });
    },

    cohortTeam: async (
      root,
      { slack_team_id, slack_channel_id },
      { models: { Wizard, CohortTeam }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = Wizard.findOne({ where: { slack_team_id } });
      return CohortTeam.findOne({ where: { cohort_id: wizard.cohort_id, slack_channel_id } });
    },

    cohortTeams: async (
      root,
      { slack_team_id },
      { models: { Wizard, CohortTeam }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = Wizard.findOne({ where: { slack_team_id } });
      return CohortTeam.findAll({ where: { cohort_id: wizard.cohort_id } });
    },

    cohort: async (root, { cohort_id }, { models: { Cohort } }) => Cohort.findById(cohort_id),

    cohorts: async (root, data, { models: { Cohort } }) => Cohort.findAll(data),

    projects: async (root, data, { models: { Project } }) => Project.findAll(data),
  },

  Mutation: {
    createWizard: async (root, { wizard_data }, { models: { Wizard }, is_wizard }) => {
      requireWizard(is_wizard);
      const wizard = Wizard.build(wizard_data);
      await wizard.generateSecret();
      return wizard.save();
    },

    integrateWizardWithCohort: async (
      root,
      { slack_team_id, cohort_id, bot_secret },
      { models: { Wizard }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = await Wizard.findOne({ where: { slack_team_id } });
      requireSlackAdmin(wizard, bot_secret);
      return wizard.update({ cohort_id });
    },

    registerCohortTeamCohortUser: async (
      root,
      { slack_team_id, slack_channel_id, slack_user_id, email_base, role },
      { models: { Wizard, User, CohortTeam, CohortUser, CohortTeamCohortUser }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = await Wizard.findOne({ where: { slack_team_id } });
      const cohort_team = await CohortTeam.findOne({
        where: { slack_channel_id, cohort_id: wizard.cohort_id },
      });
      const user = await User.findOne({ where: { email: { [Op.iLike]: `${email_base}%` } } });
      if (!user) {
        throw new Error(`User with email base '${email_base}' was not found.`);
      }
      const cohort_user = await CohortUser.findOne({
        where: { cohort_id: wizard.cohort_id, user_id: user.id },
      });
      const cohort_team_associations = await cohort_user.getTeamAssociations();
      if (cohort_team_associations.find(association => association.status === 'active')) {
        throw new Error('User is already registered in a team.');
      }
      await Promise.all(cohort_team_associations.map(
        association => association.update({ status: 'reassigned' }),
      ));
      await cohort_user.update({
        slack_user_id,
        cohort_tier_id: cohort_team.cohort_tier_id,
        status: 'team_assigned',
      });
      return CohortTeamCohortUser.create({
        cohort_user_id: cohort_user.id,
        cohort_team_id: cohort_team.id,
        role,
      });
    },

    unregisterCohortTeamCohortUser: async (
      root,
      { slack_team_id, slack_channel_id, slack_user_id, admin_slack_user_id },
      { models: { Wizard, CohortTeam, CohortUser, CohortTeamCohortUser }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = await Wizard.findOne({ where: { slack_team_id } });
      await requireSlackAdmin(admin_slack_user_id, wizard.cohort_id);
      const cohort_team = await CohortTeam.findOne({
        where: { slack_channel_id, cohort_id: wizard.cohort_id },
      });
      const cohort_user = await CohortUser.findOne({
        where: { cohort_id: wizard.cohort_id, slack_user_id },
      });
      await cohort_user.update({ status: 'tier_assigned' });
      const cohort_team_cohort_user = await CohortTeamCohortUser.findOne({
        where: { cohort_user_id: cohort_user.id, cohort_team_id: cohort_team.id },
      });
      return cohort_team_cohort_user.update({ status: 'removed' });
    },

    wizardCreateCohortTeam: async (
      root,
      { slack_team_id, title, slack_channel_id, slack_user_id },
      { models: { Wizard, CohortTeam, Project, Tier, CohortTier }, is_wizard },
    ) => {
      requireWizard(is_wizard);
      const wizard = await Wizard.findOne({ where: { slack_team_id } });
      if (!wizard.cohort_id) {
        throw new Error('This wizard has not been associated with a cohort.');
      }
      requireSlackAdmin(slack_user_id, wizard.cohort_id);
      // Get CohortTier based on title
      let tier_title = 'Bears';
      if (title.indexOf('Bears') === -1) {
        if (title.indexOf('Geckos') > 0) {
          tier_title = 'Geckos';
        } else if (title.indexOf('Toucans') > 0) {
          tier_title = 'Toucans';
        } else {
          throw new Error('Cannot map team title to tier.');
        }
      }
      const tier = await Tier.findOne({ where: { title: tier_title } });
      const cohort_tier = await CohortTier.findOne({
        where: { tier_id: tier.id, cohort_id: wizard.cohort_id },
      });
      // Create team & project
      const cohort_team = CohortTeam.build({
        title,
        slack_channel_id,
        cohort_id: wizard.cohort_id,
        cohort_tier_id: cohort_tier.id,
      });
      const project = await Project.create({ title: `${cohort_team.title} Project` });
      cohort_team.project_id = project.id;
      return cohort_team.save();
    },

    addUsersToCohort: async (
      root,
      { cohort_id, user_data },
      { models: { Cohort, User, CohortUser }, jwt_object },
    ) => {
      requireAdmin(jwt_object);
      const cohort = await Cohort.findById(cohort_id);
      const new_users = JSON.parse(user_data);
      const users = await Promise.all(
        new_users.map(async ({ email }) => {
          const user = {
            email,
            first_name: 'Placeholder',
            last_name: 'Placeholder',
            github_url: 'Placeholder',
            status: 'profile_complete',
            auto_generated: true,
          };
          user.password = await User.hashPassword('baka');
          return User.create(user);
        }),
      );
      return Promise.all(
        users.map((user) => {
          const { slack_user_id } = new_users.find(nu => nu.email === user.email);
          return CohortUser.create({
            cohort_id: cohort.id,
            user_id: user.id,
            slack_user_id,
            status: 'accepted',
          });
        }),
      );
    },

    createCountry: async (root, { name }, { models: { Country, Group }, jwt_object }) => {
      await requireAdmin(jwt_object);
      const group = await Group.create({ title: `${name} Group`, group_type: 'Country' });
      return Country.create({ name, group_id: group.id });
    },

    createCity: async (root, { country_id, name }, { models: { City }, jwt_object }) => {
      await requireAdmin(jwt_object);
      return City.create({ country_id, name });
    },

    updateUserStatus: async (root, { user_id, status }, { models: { User }, jwt_object }) => {
      await requireAdmin(jwt_object);
      const target_user = await User.findById(user_id);
      return target_user.update({ status });
    },

    createTier: async (root, data, { models: { Tier }, jwt_object }) => {
      await requireAdmin(jwt_object);
      return Tier.create(data);
    },

    createCohort: async (root, { title }, { models: { Cohort, Group }, jwt_object }) => {
      await requireAdmin(jwt_object);
      const group = await Group.create({ title: `${title} Group`, group_type: 'Cohort' });
      return Cohort.create({ title, group_id: group.id });
    },

    updateCohort: async (root, { cohort_id, cohort_data }, { models: { Cohort }, jwt_object }) => {
      await requireAdmin(jwt_object);
      const cohort = await Cohort.findById(cohort_id);
      return cohort.update(cohort_data);
    },

    addTierToCohort: async (root, data, { models: { CohortTier }, jwt_object }) => {
      await requireAdmin(jwt_object);
      return CohortTier.create(data);
    },

    updateCohortUser: async (
      root,
      { cohort_user_id, cohort_user_data },
      { models: { CohortUser }, jwt_object },
    ) => {
      await requireAdmin(jwt_object);
      const cohort_user = await CohortUser.findById(cohort_user_id);
      return cohort_user.update(cohort_user_data);
    },

    createCohortTeam: async (root, data, { models: { CohortTeam, Project }, jwt_object }) => {
      await requireAdmin(jwt_object);
      const cohort_team = CohortTeam.build(data);
      await cohort_team.generateTitle();
      const project = await Project.create({ title: `${cohort_team.title} Project` });
      cohort_team.project_id = project.id;
      return cohort_team.save();
    },

    addUserToCohortTeam: async (
      root,
      { cohort_user_id, cohort_team_id, role },
      { models: { CohortUser, CohortTeamCohortUser, CohortTeam, ProjectUser }, jwt_object },
    ) => {
      await requireAdmin(jwt_object);
      const cohort_team = await CohortTeam.findById(cohort_team_id);
      const cohort_user = await CohortUser.findById(cohort_user_id);
      if (!cohort_user || !cohort_user.isAccepted()) throw new Error('User is not accepted in cohort.');
      await ProjectUser.create({
        user_id: cohort_user.user_id,
        project_id: cohort_team.project_id,
        role: cohort_team.role === 'project_manager' ? 'project_manager' : 'collaborator',
      });
      return CohortTeamCohortUser.create({ cohort_user_id, cohort_team_id, role });
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
    cohort_users: root => root.getCohortUsers(),
    teams: root => root.getCohortUsers().then(
      cohort_users => cohort_users.map(cohort_user => cohort_user.getTeam()),
    ),
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

  Wizard: {
    cohort: root => root.getCohort(),
  },

  Cohort: {
    members: root => root.getMembers(),
    users: root => root.getUsers(),
    teams: root => root.getTeams(),
    projects: root => root.getProjects(),
    countries: root => root.getUsers().then(users => users.map(user => user.getCountry())),
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
    team_act: root => root.getTeamAct(),
    act_milestone: root => root.getActMilestone(),
  },

  CohortUser: {
    user: root => root.getUser(),
    cohort: root => root.getCohort(),
    standups: root => root.getStandups(),
    team: root => root.getTeam(),
    tier: root => root.getCohortTier().then(cohort_tier => cohort_tier.getTier()),
  },

  CohortTeamTierAct: {
    team: root => root.getTeam(),
    act: root => root.getAct(),
    completed_act_milestones: root => root.getCompletedActMilestones(),
  },

  CohortTeam: {
    cohort: root => root.getCohort(),
    project: root => root.getProject(),
    tier: root => root.getCohortTier().then(cohort_tier => cohort_tier.getTier()),
    cohort_users: root => root.getCohortUsers(),
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

  CohortTeamCohortUser: {
    cohort_user: root => root.getCohortUser(),
    cohort_team: root => root.getCohortTeam(),
  },
};
