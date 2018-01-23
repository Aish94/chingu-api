const {
  Wizard,
  CohortChannel,
  CohortChannelUser,
  CohortUser,
  Metadata } = require('../../models');
const { ScrapeQ: { queue, tasks: { cohort_scrape } } } = require('../../queues/index');
const scanner = require('slack-metadata');

// initialize an array to store the aggregate CohortUser metadata
const cohort_users_metadata = [];
const updateUserMetadata = (metadata) => {
  const found_user = cohort_users_metadata.find(
    user_metadata => user_metadata.user_id === metadata.user_id,
  );

  if (!found_user) cohort_users_metadata.push(Object.assign({}, metadata));

  else {
    Object.keys(metadata).forEach((metric) => {
      // ignore the user_id property
      if (metric === 'user_id') return;
      if (!found_user[metric]) found_user[metric] = metadata[metric];
      else found_user[metric] += metadata[metric];
    });
  }
};

const storeChannelMetadata = async (metadata, channel) => {
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
};

const storeChannelUserMetadata = async (metadata, channel) => {
  // ignore bot users
  if (metadata.bot) return;

  // update the CohortUser metadata (aggregate)
  updateUserMetadata(metadata);

  // remove AND rename redundant user_id through unfathomable wizardry
  const { user_id: slack_user_id, ...channel_user_metadata } = metadata;
  const cohort_user = await CohortUser.findOne({ where: { slack_user_id } });
  const channel_user = await CohortChannelUser.findOne({
    where: {
      cohort_user_id: cohort_user.id,
      cohort_channel_id: channel.id,
    },
  });

  await Metadata.create({
    metadata: channel_user_metadata,
    metadata_source: 'slack',
    entity_type: 'CohortChannelUser',
    entity_id: channel_user.id,
  }).catch(console.error);
};

const storeMetadata = async (metadata, channel) => {
  // if there is no metadata to process
  if (!metadata) return null;

  await storeChannelMetadata(metadata, channel);

  await Promise.all(metadata.users_metadata.map(
    async user_metadata => storeChannelUserMetadata(user_metadata, channel)),
  ).catch(console.error);

  return metadata;
};

const scanChannel = async (channel, slack_team_token) => scanner(
  channel.slack_channel_id,
  slack_team_token,
  channel.last_slack_scrape_ts,
).then(async metadata => storeMetadata(metadata, channel)).catch(console.error);

queue.process(cohort_scrape, async ({ data: cohort_id }, done) => {
  const wizard = await Wizard.findOne({ where: { cohort_id } });
  if (!wizard) return console.error(`YOU SHALL NOT PASS...for there is no wizard associated with this ${cohort_id} cohort ID`);
  const channels = await CohortChannel.findAll({ where: { cohort_id } });
  const { slack_team_token } = wizard;

  await Promise.all(channels.map(channel => scanChannel(channel, slack_team_token)))
    .then((scanned_channels) => {
      console.log(cohort_users_metadata);
      // TODO: add CohortUser metadata by aggregating of the user metadata across all scanned channels
      done();
    }).catch();
});
