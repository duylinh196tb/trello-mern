const mongoose = require('mongoose');

const tasks = [
  {
    _id: mongoose.Types.ObjectId(),
    content: 'task-1'
  },
  {
    _id: mongoose.Types.ObjectId(),
    content: 'task-2'
  }
];

const columns = [
  {
    _id: mongoose.Types.ObjectId(),
    title: 'Column-1',
    tasksOrder: [tasks[0]._id, tasks[1]._id]
  },
  {
    _id: mongoose.Types.ObjectId(),
    title: 'Column-2',
    tasksOrder: [tasks[0]._id]
  }
];

const boards = [
  {
    _id: mongoose.Types.ObjectId(),
    title: 'Board-1',
    columnOrder: [columns[0]._id, columns[1]._id]
  },
  {
    _id: mongoose.Types.ObjectId(),
    title: 'Board-2',
    columnOrder: [columns[0]._id]
  }
];

module.exports = {
  boards,
  columns,
  tasks
};
