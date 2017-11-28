const { Schema, model } = require('mongoose');

const fileMetadataSchema = {
  type: String,
  lines: Number,
  reactions: Number,
  comments_count: Number,
  is_starred: Boolean,
  num_stars: Number,
};

const metadataSchema = new Schema({
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
