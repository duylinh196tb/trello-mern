const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  content: String
  // column: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Column'
  // }
});

module.exports = mongoose.model('Task', TaskSchema);
