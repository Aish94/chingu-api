const AdminQueries = require('./queries');
const AdminMutations = require('./mutations');

module.exports = () => [AdminQueries, AdminMutations];
