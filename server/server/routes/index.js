const express = require('express');
const boards = require('./boards/boards');
const tasks = require('./boards/tasks');
const columns = require('./boards/columns');
const auth = require('./auth');

const routers = express();

routers.use('/api/v1/boards', boards);
routers.use('/api/v1/columns', columns);
routers.use('/api/v1/tasks', tasks);
routers.use('/api/v1/auth', auth);

routers.get('/', (_, res) => {
  res.json({
    code: 200,
    status: 'ok',
    message: 'Success!!!!!!'
  });
});
module.exports = routers;
