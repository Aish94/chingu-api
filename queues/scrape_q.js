const { createQueue } = require('kue');
const { getConfigPath } = require('../config/utilities');

const { REDIS_URL: redis } = require(getConfigPath('config'));

const queue = createQueue({
  prefix: 'scrape_q',
  redis,
});

module.exports = {
  queue,
  tasks: {
    cohort_scrape: 'cohort_scrape',
  },
};
