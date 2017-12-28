const UserQueries = require('./queries');
const UserMutations = require('./mutations');

module.exports = [...UserQueries, ...UserMutations];
