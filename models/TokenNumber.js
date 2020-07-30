const mongoose = require('mongoose');

const TokenNumberSchema = new mongoose.Schema({
  token: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TokenNumber = mongoose.model('tokenNumber', TokenNumberSchema);
