const mongoose = require('mongoose');

const TestDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TestDetail = mongoose.model('testDetail', TestDetailSchema);
