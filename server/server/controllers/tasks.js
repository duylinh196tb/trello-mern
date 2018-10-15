const service = require('../service');
const Task = require('../models/task');
const Column = require('../models/column');
const Board = require('../models/board');

const createTask = async (req, res) => {
  try {
    // console.log(checkProject);

    const { column, board } = req.body;

    let data = await Task.create({
      ...req.body
    });
    console.log(data);

    await Promise.all([
      Column.findByIdAndUpdate(column, {
        $push: { taskOrder: data._id }
      }),
      Board.findByIdAndUpdate(board, {
        $push: { taskList: data._id }
      })
    ]);

    if (data) {
      res.json(
        service.response.success('Create task success!!!', {
          _id: data._id,
          content: data.content,
          column
        })
      );
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async (req, res) => {
  try {
    const data = await Task.find();
    if (data) {
      res.json(
        service.response.success('Lấy danh sách tasks thành công', data)
      );
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getTask = async (req, res) => {
  try {
    const data = await Task.findById(req.params.id);
    if (data) {
      res.json(service.response.success('Lấy task thành công', data));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay task'));
    }
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (req, res) => {
  try {
    const data = await Task.findOneAndDelete({ _id: req.params.id });
    if (data) {
      res.json(service.response.success('Xoa task thanh cong', data.id));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay task'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

const updateTask = async (req, res) => {
  try {
    const data = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      }
    );
    if (data) {
      res.json(service.response.success('Update thanh cong', data));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay task'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask
};
