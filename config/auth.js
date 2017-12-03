const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { getConfigPath } = require('./utilities');

const { JWT_SECRET, AUTOBOT_CDN_API_SECRET } = require(getConfigPath('config'));

const authenticateAutobot = async ({ headers: { authorization } }) => {
  if (!authorization) return false;

  return authorization === AUTOBOT_CDN_API_SECRET;
};

const requireAutobot = async (autobot) => {
  if (!autobot) {
    throw new Error('Autobot privileges required.');
  }
};


const authenticate = async ({ headers: { authorization } }) => {
  if (!authorization || !authorization.split(' ').length > 1) return false;

  const token = authorization.split(' ')[1];

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};

const getLoggedInUser = async (jwt_object) => {
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
  authenticate,
  getLoggedInUser,
  checkUserPermissions,
  requireAdmin,
};
