const service = require('../service');
const { CODE } = require('../constants');
const Board = require('../models/board');
const Column = require('../models/column');
const User = require('../models/user');

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
    const { title } = req.body;

    const data = await Board.create({
      title,
      users: [req.user.email]
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { boards: data._id } });

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
    const user = await User.findOne({ email: req.user.email });
    console.log(user);

    const boards = [];
    user.boards.forEach(board => {
      boards.push(Board.findById(board));
    });

    const data = await Promise.all(boards);

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
    if (req.user.boards.indexOf(req.params.id) === -1) {
      return res.json({
        code: 404,
        message: 'Board not found!'
      });
    }
    // 5bcb3150a6bec15cf4eff560

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
      tasks: data[1].taskList,
      users: data[0].users
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
    const { columnOrder, addUser, removeUser } = req.body;

    const checkCl = await checkColumns(columnOrder);

    if (checkCl.length > 0) {
      return res.json({
        code: 404,
        message: 'Columns khong ton tai trong he thong',
        data: checkCl
      });
    }
    let data = {};

    // TODO: thay doi users trong board
    if (addUser || removeUser) {
      const user = await User.findOne({ email: addUser || removeUser });
      if (!user) {
        return res.json({
          code: 404,
          message: `${addUser || removeUser} not found`
        });
      }

      // TODO: update user vao bang
      data = await Board.findOneAndUpdate(
        { _id: req.params.id },
        {
          [(addUser && '$push') || (removeUser && '$pull')]: {
            users: addUser || removeUser
          }
        },
        { new: true }
      );

      // update boards trong user
      await User.findOneAndUpdate(
        { email: addUser || removeUser },
        {
          [(addUser && '$push') || (removeUser && '$pull')]: {
            boards: addUser && removeUser
          }
        }
      );
    } else {
      data = await Board.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { ...req.body }
        },
        { new: true }
      );
    }

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

const updateUsersBoard = async (req, res) => {
  const { addUser, removeUser } = req.body;

  if (addUser || removeUser) {
    await User.findOne({ email: addUser || removeUser }).then(user => {
      if (!user)
        return res.json({
          code: 404,
          message: `${addUser || removeUser} not found`
        });
    });
  }

  const data = await Board.findOneAndUpdate(
    { _id: req.params.id },
    {
      [(addUser && '$push') || (removeUser && '$pull')]: {
        users: addUser || removeUser
      }
    },
    { new: true }
  );

  await User.findOne(
    { email: addUser || removeUser },
    {
      [(addUser && '$push') || (removeUser && '$pull')]: {
        boards: addUser && removeUser
      }
    }
  );

  if (data) {
    res.json(service.response.success('Update thanh cong', data));
  } else {
    res.json(service.response.objectNotFound('Khong tim thay board'));
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoard,
  deleteBoard,
  updateBoard
};
