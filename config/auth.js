const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { loadConfigFile } = require('./utilities');

const config = loadConfigFile('config');

module.exports.authenticate = async (req) => {
  const token = req.headers.authorization;
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return {};
  }
};

module.exports.adminRequired = (jwt_object) => {
  if (jwt_object.user_role === 'admin') return jwt_object;

  throw new Error('Admin privileges required.');
};

module.exports.loginRequired = (jwt_object) => {
  if (jwt_object.user_id) return jwt_object;

  throw new Error('Login required.');
};

module.exports.getLoggedInUser = user => User.findById(user.user_id);
