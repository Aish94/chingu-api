const { createQueue } = require('kue');
const { getConfigPath } = require('../config/utilities');

const { REDIS_URL: redis } = require(getConfigPath('config'));

const scrape_q = createQueue({
  prefix: 'scrape_q',
  redis,
});

const standup_q = createQueue({
  prefix: 'standup_q',
  redis,
});

scrape_q.process('cohort_weekly_scrape', ({ data: { cohort_id } }, done) => {

});

standup_q.process()
