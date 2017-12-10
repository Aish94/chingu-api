const jwt = require('jsonwebtoken');
const { User, CohortUser } = require('../models');
const { getConfigPath } = require('./utilities');

const { JWT_SECRET, AUTOBOT_CDN_API_SECRET } = require(getConfigPath('config'));

const authenticateAutobot = ({ headers: { authorization } }) => {
  if (!authorization) return false;

  return authorization === AUTOBOT_CDN_API_SECRET;
};

const requireAutobot = (autobot) => {
  if (!autobot) {
    throw new Error('Autobot privileges required.');
  }
};

const requireSlackAdmin = async (autobot, bot_secret, slack_user_id) => {
  if (bot_secret) {
    if (autobot.cohort_id) {
      throw new Error('This secret is no longer valid. Autobot has already been integrated.');
    }

    if (autobot.bot_secret !== bot_secret) {
      throw new Error('Invalid secret. Permission denied.');
    }
  } else {
    const cohort_user = await CohortUser({
      where: { cohort_id: autobot.cohort_id, slack_user_id },
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
  authenticateAutobot,
  requireAutobot,
  requireSlackAdmin,
  authenticate,
  getLoggedInUser,
  checkUserPermissions,
  requireAdmin,
};
