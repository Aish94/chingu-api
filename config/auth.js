const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { loadConfigFile } = require('./utilities');

const config = loadConfigFile('config');

module.exports.authenticate = async (req) => {
  const token = req.headers.authorization;
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports.checkUserPermissions = async (user, permissions) => {
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

module.exports.getLoggedInUser = async (jwt_object) => {
  if (jwt_object.id) return User.findById(jwt_object.id);
  throw new Error('Login required.');
};
