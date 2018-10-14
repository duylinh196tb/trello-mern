const mongoose = require('mongoose');
const { app } = require('../server');
const {
  populateData,
  testPost,
  testGet,
  testDelete,
  testUpdate,
  testErrReq
} = require('./seed/helperTest');
const { CODE } = require('../constants');
const { boards, columns, tasks } = require('./seed/seed');
const Board = require('../models/board');
const Column = require('../models/column');
const Task = require('../models/task');

const initialData = {
  dataSeed: boards,
  model: Board,
  url: '/boards',
  token: { Authorization: '' }
};
const initialDataC = {
  dataSeed: columns,
  model: Column,
  url: '/columns',
  token: { Authorization: '' }
};
const initialDataT = {
  dataSeed: tasks,
  model: Task,
  url: '/tasks',
  token: { Authorization: '' }
};

beforeEach(done => populateData(done, boards, Board));
beforeEach(done => populateData(done, columns, Column));
beforeEach(done => populateData(done, tasks, Task));

describe('BOARDS', () => {
  describe('/POST ', () => {
    const data = {
      title: 'weqdsa'
    };

    testPost(initialData, data);
  });

  describe('/GET', () => {
    testGet(initialData);
  });

  describe('/DELETE', () => {
    testDelete(initialData);
  });

  describe('/UPDATE', () => {
    const data = {
      title: '2ewqsd',
      columnOrder: [columns[0]._id]
    };

    testUpdate(initialData, data);
  });
});

describe('BOARDS', () => {
  describe('/POST ', () => {
    const data = {
      title: 'weqdsa'
    };

    testPost(initialDataC, data);
  });

  describe('/GET', () => {
    testGet(initialDataC);
  });

  describe('/DELETE', () => {
    testDelete(initialDataC);
  });

  describe('/UPDATE', () => {
    const data = {
      title: '2ewqsd',
      taskOrder: [tasks[0]._id]
    };

    testUpdate(initialDataC, data);
  });
});
describe('COLUMNS', () => {
  describe('/POST ', () => {
    const data = {
      title: 'weqdsa'
    };

    testPost(initialDataC, data);
  });

  describe('/GET', () => {
    testGet(initialDataC);
  });

  describe('/DELETE', () => {
    testDelete(initialDataC);
  });

  describe('/UPDATE', () => {
    const data = {
      title: '2ewqsd',
      taskOrder: [tasks[0]._id]
    };

    testUpdate(initialDataC, data);
  });
});

describe('TASKS', () => {
  describe('/POST ', () => {
    const data = {
      content: 'weqdsa'
    };

    testPost(initialDataT, data);
  });

  describe('/GET', () => {
    testGet(initialDataT);
  });

  describe('/DELETE', () => {
    testDelete(initialDataT);
  });

  describe('/UPDATE', () => {
    const data = {
      content: '2ewqsd'
    };

    testUpdate(initialDataT, data);
  });
});
