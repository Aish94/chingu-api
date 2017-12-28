const WizardQueries = require('./queries');
const WizardMutations = require('./mutations');

module.exports = [...WizardQueries, ...WizardMutations];
