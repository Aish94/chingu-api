const { Wizard, CohortChannel } = require('../../models');
const { ScrapeQ: { queue, tasks: { cohort_scrape } } } = require('../../queues/index');
const scraper = require('slackmetascraper');

queue.process(cohort_scrape, async ({ data: cohort_id }, done) => {
  const wizard = await Wizard.findOne({ where: { cohort_id } });

  // flesh this error out later
  if (!wizard) return console.error('no wiz');

  const channels = await CohortChannel.findAll({ where: { cohort_id } });
  const { slack_team_token } = wizard;

  const scrape_results = await Promise.all(
    channels.map(channel => scraper(
      channel.slack_channel_id,
      slack_team_token,
      channel.last_slack_scrape_ts,
    ).then(async (channel_metadata) => {
      if (channel_metadata.user_metadata) {
        await channel.update({ last_slack_scrape_ts: channel_metadata.timestamp });
        // TODO: update metadata table
      }
      return channel_metadata;
    })),
  );

  done();

  return console.log(scrape_results);
});


