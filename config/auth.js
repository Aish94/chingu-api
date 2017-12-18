const jwt = require('jsonwebtoken');
const { Wizard, User, CohortUser, CohortTeamCohortUser } = require('../models');
const { getConfigPath } = require('./utilities');

const { JWT_SECRET, WIZARD_CDN_API_SECRET } = require(getConfigPath('config'));

const authenticateWizard = ({ headers: { authorization } }) => {
  if (!authorization) return false;

  return authorization === WIZARD_CDN_API_SECRET;
};

const requireWizard = async (is_wizard, slack_team_id) => {
  if (!is_wizard) {
    throw new Error('Wizard privileges required.');
  }

  if (slack_team_id) {
    const wizard = Wizard.findOne({ where: { slack_team_id } });
    if (!wizard) {
      throw new Error('This wizard does not exist');
    }

    return wizard;
  }

  return true;
};

const requireProjectManager = async ({ id, cohort_id }, slack_user_id) => {
  const cohort_user = await CohortUser.findOne({ where: { cohort_id, slack_user_id } });
  const cohort_team_cohort_user = await CohortTeamCohortUser.findOne({
    where: { cohort_team_id: id, cohort_user_id: cohort_user.id },
  });

  if (!cohort_team_cohort_user) {
    throw new Error('You are not a member of this team.');
  }

  if (cohort_team_cohort_user.role !== 'project_manager') {
    throw new Error('You are not the project manager of this team');
  }

  return cohort_team_cohort_user;
};

const requireSlackAdmin = async (wizard, bot_secret, slack_user_id) => {
  if (bot_secret) {
    if (wizard.cohort_id) {
      throw new Error('This secret is no longer valid. Wizard has already been integrated.');
    }

    if (wizard.bot_secret !== bot_secret) {
      throw new Error('Invalid secret. Permission denied.');
    }
  } else {
    const cohort_user = await CohortUser.findOne({
      where: { cohort_id: wizard.cohort_id, slack_user_id },
    });
    const user = await cohort_user.getUser();
    if (user.role !== 'admin') {
      throw new Error('User must have admin priveleges.');
    }
  }
};

const authenticate = ({ headers: { authorization } }) => {
  if (!authorization || !authorization.split(' ').length > 1) return false;

  const token = authorization.split(' ')[1];

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};

const getLoggedInUser = (jwt_object) => {
  if (jwt_object.id) return User.findById(jwt_object.id);
  throw new Error('Login required.');
};

const checkUserPermissions = (user, permissions) => {
  if (permissions.role) {
    if (permissions.role === 'admin' && user.role !== 'admin') {
      throw new Error('Admin privileges required.');
    } else if (permissions.role === 'moderator' && user.role === 'member') {
      throw new Error('Moderator privileges required.');
    }
  }

  if (permissions.status) {
    if (permissions.status === 'profile_complete' && user.status !== 'profile_complete') {
      throw new Error('Profile must be complete.');
    } else if (permissions.status === 'profile_incomplete' && user.status === 'pending_approval') {
      throw new Error('Must be accepted into Chingu.');
    }
  }

  return user;
};

const requireAdmin = async (jwt_object) => {
  const user = await getLoggedInUser(jwt_object);
  return checkUserPermissions(user, { role: 'admin ' });
};

module.exports = {
  authenticateWizard,
  requireWizard,
  requireProjectManager,
  requireSlackAdmin,
  authenticate,
  getLoggedInUser,
  checkUserPermissions,
  requireAdmin,
};
