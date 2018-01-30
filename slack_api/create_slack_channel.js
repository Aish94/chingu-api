const axios = require('axios');
const qs = require('querystring');

const createSlackChannel = async (title, token, is_public) => {
  const name = title.toLowerCase().replace(' ', '-');

  const url = is_public ? 'https://slack.com/api/channels.create' : 'https://slack.com/api/groups.create';
  const request = { name, token };
  const { data } = await axios.post(url, qs.stringify(request));
  if (!data.ok) throw new Error(JSON.stringify(data));
  else if (data.channel) return data.channel.id;
  else if (data.group) return data.group.id;
  return null;
};

module.exports = createSlackChannel;
