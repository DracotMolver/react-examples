// News/index.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  story_id: Number,
  title: String,
  story_title: String,
  story_url: String,
  url: String,
  author: String,
  // 
  created_at: Date,
  deleted_at: {
    type: Date,
    default: null
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
