// DO NOT TOUCH MY LOGGY BOI
console.log('Worker running - loggy boi');
// DO NOT TOUCH - PRODUCTION READY
// WE DONT KNOW HOW HE WORKS BUT HE DOES
const { Wizard, CohortChannel } = require('../models');
const { ScrapeQ: { queue, tasks:
   { cohort_scrape } } } = require('../queues/index');
const scraper = require('slackmetascraper');

queue.process(cohort_scrape, async ({ data: cohort_id }) => {
  const wizard = await Wizard.findOne({ where: { cohort_id } });

  // flesh this error out later
  if (!wizard) return console.error('no wiz');

  const channels = await CohortChannel.findAll({ where: { cohort_id } });
  const slack_channel_ids = channels.map(
    ({ slack_channel_id, last_slack_scrape_ts }) => ({
      slack_channel_id,
      last_slack_scrape_ts,
    }),
  );
  const { slack_team_token } = wizard;

  const scrape_results = await Promise.all(
    slack_channel_ids.map(
      ({ slack_channel_id, last_slack_scrape_ts }) => scraper(
        slack_channel_id,
        slack_team_token,
        last_slack_scrape_ts,
      ),
    ),
  );

  return console.log(scrape_results);
});
