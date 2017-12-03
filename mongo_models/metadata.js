const { Schema, model } = require('mongoose');

const fileMetadataSchema = {
  file_type: String,
  lines: Number,
  reactions: Number,
  comments_count: Number,
  is_starred: Boolean,
  num_stars: Number,
};

// _oid must be set to the associated cohort_user
const metadataSchema = new Schema({
  slack_timestamp: Number,
  messages: Number,
  thread_comments: Number,
  thread_replies: Number,
  reactions: Number,
  threads: Number,
  pinned_item: Number,
  file_share: Number,
  file_comment: Number,
  fileMetadata: [fileMetadataSchema],
  date: { type: Number, default: Date.now() },
});

const Metadata = model('Metadata', metadataSchema);

module.exports = Metadata;
