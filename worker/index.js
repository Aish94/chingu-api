console.log('Worker running - loggy boi');
const { Wizard, CohortChannel } = require('../models'); 
const { ScrapeQ: { queue, tasks: { cohort_scrape } } } = require('../queues/index');


queue.process(cohort_scrape, ({ data }, done) => {
  console.log(data);
});

// slack_team_token, slack_team_id, slack_channel_id, [start / end / count]
