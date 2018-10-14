const mongoose = require('mongoose');

const { Schema } = mongoose;

const ColumnSchema = new Schema({
  title: String,
  // board: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Board'
  // },
  taskOrder: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
});

module.exports = mongoose.model('Column', ColumnSchema);
