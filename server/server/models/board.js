const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  title: String,
  columnOrder: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Column'
    }
  ],
  taskList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  users: [
    {
      type: Schema.Types.String,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Board', BoardSchema);
