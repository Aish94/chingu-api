const { Wizard, CohortChannel, CohortChannelUser, CohortUser, Metadata } = require('../../models');
const { ScrapeQ: { queue, tasks: { cohort_scrape } } } = require('../../queues/index');
const scraper = require('slack-metadata');

const scrapeChannel = async (channel, slack_team_token) => scraper(
  channel.slack_channel_id,
  slack_team_token,
  channel.last_slack_scrape_ts,
).then(async (metadata) => {
  // if there is no metadata to process
  if (!metadata) return null;

  // remove the redundant channel_id property through advanced wizardry
  const { channel_id, ...channel_metadata } = metadata.channel_metadata;
  // update the Slack timestamp on the channel entry
  await channel.update({ last_slack_scrape_ts: metadata.timestamp });

  await Metadata.create({
    metadata: channel_metadata,
    metadata_source: 'slack',
    entity_type: 'CohortChannel',
    entity_id: channel.id,
  }).catch(console.error);

  await Promise.all(metadata.users_metadata.map(
    async (user_metadata) => {
      // ignore bot users
      if (user_metadata.bot) return;

      const { user_id: slack_user_id, ...channel_user_metadata } = user_metadata;
      const cohort_user = await CohortUser.findOne({ where: { slack_user_id } });
      const channel_user = await CohortChannelUser.findOne({
        where: {
          cohort_user_id: cohort_user.id,
          cohort_channel_id: channel.id,
        },
      });

      Metadata.create({
        metadata: channel_user_metadata,
        metadata_source: 'slack',
        entity_type: 'CohortChannelUser',
        entity_id: channel_user.id,
      }).catch(console.error);
    },
  )).catch(console.error);

  return metadata;
}).catch(console.error);

queue.process(cohort_scrape, async ({ data: cohort_id }, done) => {
  const wizard = await Wizard.findOne({ where: { cohort_id } });
  // TODO: flesh this error out later
  if (!wizard) return console.error('no wiz');
  const channels = await CohortChannel.findAll({ where: { cohort_id } });
  const { slack_team_token } = wizard;

  await Promise.all(channels.map(channel => scrapeChannel(channel, slack_team_token)))
    .then((scraped_channels) => {
      // TODO: add CohortUser metadata by aggregating of the user metadata across all scanned channels
      done();
    }).catch();
});
