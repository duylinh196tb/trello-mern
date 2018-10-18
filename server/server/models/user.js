const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  baseToken: String,
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
