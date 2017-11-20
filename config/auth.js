const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { loadConfigFile } = require('./utilities');

const config = loadConfigFile('config');

module.exports.authenticate = async (req) => {
  const token = req.headers.authorization;
  try {
    return await jwt.verify(token, config.SECRET);
  } catch (err) {
    return {};
  }
};

module.exports.adminRequired = (user) => {
  if (user.role === 'admin') return user;

  throw new Error('Admin privileges required.');
};

module.exports.loginRequired = (user) => {
  if (user.id) return user;

  throw new Error('Login required.');
};

module.exports.getLoggedInUser = user => User.findById(user.id);
