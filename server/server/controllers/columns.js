const service = require('../service');
const { CODE } = require('../constants');
const Column = require('../models/column');
const Task = require('../models/task');
const Board = require('../models/board');

const checkTasks = async tasks => {
  const checkCl = [];
  const arrFlNull = [];
  tasks && tasks.forEach(task => checkCl.push(Task.findById(task)));
  const check = await Promise.all(checkCl);
  check.forEach((fl, index) => {
    if (fl === null) arrFlNull.push(tasks[index]);
  });
  return arrFlNull;
};

const createColumn = async (req, res) => {
  try {
    const { board } = req.body;

    const data = await Column.create({
      ...req.body
    });
    await Board.findByIdAndUpdate(board, {
      $push: { columnOrder: data._id }
    });

    if (data) {
      res.json(service.response.success('Create column success!!!', data));
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getAllColumns = async (req, res) => {
  try {
    const data = await Column.find();
    if (data) {
      res.json(
        service.response.success('Lấy danh sách columns thành công', data)
      );
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getColumn = async (req, res) => {
  try {
    const data = await Column.findById(req.params.id);
    if (data) {
      res.json(service.response.success('Lấy column thành công', data));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay column'));
    }
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (req, res) => {
  try {
    const data = await Column.findOneAndDelete({ _id: req.params.id });
    if (data) {
      res.json(service.response.success('Xoa column thanh cong', data.id));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay column'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

const updateColumn = async (req, res) => {
  try {
    const { taskOrder } = req.body;

    const checkCl = await checkTasks(taskOrder);

    if (checkCl.length > 0) {
      return res.json({
        code: 404,
        message: 'Tasks khong ton tai trong he thong',
        data: checkCl
      });
    }

    const data = await Column.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      }
    );
    if (data) {
      res.json(service.response.success('Update thanh cong', data));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay column'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

module.exports = {
  createColumn,
  getAllColumns,
  getColumn,
  deleteColumn,
  updateColumn
};
