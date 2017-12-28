const Base = require('./base');
const Admin = require('./admin');
const Wizard = require('./wizard');
const User = require('./user');

module.exports = [Base, ...Admin, ...Wizard, ...User];
