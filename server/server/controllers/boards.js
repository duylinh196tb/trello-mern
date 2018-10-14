const service = require('../service');
const { CODE } = require('../constants');
const Board = require('../models/board');
const Column = require('../models/column');
const Task = require('../models/task');

const checkColumns = async columns => {
  const checkCl = [];
  const arrFlNull = [];
  columns && columns.forEach(column => checkCl.push(Column.findById(column)));
  const check = await Promise.all(checkCl);
  check.forEach((fl, index) => {
    if (fl === null) arrFlNull.push(columns[index]);
  });
  return arrFlNull;
};

const createBoard = async (req, res) => {
  try {
    // console.log(checkProject);

    console.log(res.body);
    const data = await Board.create({
      ...req.body
    });

    if (data) {
      res.json(service.response.success('Create board success!!!', data));
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getAllBoards = async (req, res) => {
  try {
    const data = await Board.find();
    if (data) {
      res.json(
        service.response.success('Lấy danh sách boards thành công', data)
      );
    } else {
      res.json(service.response.databaseError('Loi database'));
    }
  } catch (error) {
    throw error;
  }
};

const getBoard = async (req, res) => {
  try {
    // const data = await Board.findById(req.params.id).populate('columnOrder');

    const data = await Promise.all([
      Board.findById(req.params.id),
      Board.findById(req.params.id)
        .populate('columnOrder')
        .populate('taskList')
    ]);

    if (!data[0] || !data[1]) {
      return res.json(service.response.objectNotFound('Khong tim thay board'));
    }

    console.log(data[0]);
    const resData = {
      _id: data[0]._id,
      title: data[0].title,
      columnOrder: data[0].columnOrder,
      columns: data[1].columnOrder,
      tasks: data[1].taskList
    };

    res.json(service.response.success('Lấy board thành công', resData));
  } catch (error) {
    throw error;
  }
};

const deleteBoard = async (req, res) => {
  try {
    const data = await Board.findOneAndDelete({ _id: req.params.id });
    if (data) {
      res.json(service.response.success('Xoa board thanh cong', data.id));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay board'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

const updateBoard = async (req, res) => {
  try {
    const { columnOrder } = req.body;

    const checkCl = await checkColumns(columnOrder);

    if (checkCl.length > 0) {
      return res.json({
        code: 404,
        message: 'Columns khong ton tai trong he thong',
        data: checkCl
      });
    }

    const data = await Board.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      }
    );
    if (data) {
      res.json(service.response.success('Update thanh cong', data));
    } else {
      res.json(service.response.objectNotFound('Khong tim thay board'));
    }
  } catch (error) {
    res.json(
      service.response.exception('Server không phản hồi', error.message)
    );
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoard,
  deleteBoard,
  updateBoard
};
