const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    require: true,
  },
  sex: {
    type: String,
    require: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  show: {
    type: Boolean,
    default: false,
  },
  referedBy: {
    type: String,
    default: 'Self',
  },
  tests: [
    {
      name: {
        type: String,
        require: true,
      },
      price: {
        type: String,
        require: true,
      },
    },
  ],
  key: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  filename: {
    type: String,
  },
  amountPaid: {
    type: Number,
    require: true,
  },
  amountRemaining: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
