import { takeLatest, all, takeEvery } from "redux-saga/effects";
import { message } from "antd";
import {
  CREATE_BOARD,
  GET_ALL_BOARDS,
  GET_BOARD,
  CREATE_TASK,
  SAVE_CREATE_TASK,
  SAVE_CREATE_COLUMN,
  CREATE_COLUMN,
  UPDATE_BOARD,
  SAVE_UPDATE_BOARD,
  UPDATE_COLUMN
} from "../actions/types";

import { saveCreateBoard, saveAllBoards, saveBoard } from "../actions/boards";

import boards from "../api/boards";

import { createRequestSaga } from "./common";

// Board
const createBoard = createRequestSaga({
  request: boards.createBoard,
  key: "createBoard",
  success: [res => saveCreateBoard(res.data)],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});
const updateBoard = createRequestSaga({
  request: boards.updateBoard,
  key: "updateBoard",
  success: [
    res => ({
      type: SAVE_UPDATE_BOARD,
      payload: res.data
    })
  ],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});

const getAllBoards = createRequestSaga({
  request: boards.getAllBoards,
  key: "getAllBoards",
  success: [res => saveAllBoards(res.data)],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});

const getBoard = createRequestSaga({
  request: boards.getBoard,
  key: "getBoard",
  success: [res => saveBoard(res.data)],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});

// Task
const createTask = createRequestSaga({
  request: boards.createTask,
  key: "createTask",
  success: [
    res => ({
      type: SAVE_CREATE_TASK,
      payload: res.data
    })
  ],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});

// Column
const createColumn = createRequestSaga({
  request: boards.createColumn,
  key: "createColumn",
  success: [
    res => ({
      type: SAVE_CREATE_COLUMN,
      payload: res.data
    })
  ],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});
const updateColumn = createRequestSaga({
  request: boards.updateColumn,
  key: "updateColumn",
  success: [
    // res => ({
    //   type: SAVE_CREATE_COLUMN,
    //   payload: res.data
    // })
  ],
  failure: [],
  functionSuccess: [res => message.success("Success!!!")]
});

export default [
  function* fetchWatcher() {
    yield all([
      // Boards

      takeLatest(CREATE_BOARD, createBoard),
      takeLatest(GET_ALL_BOARDS, getAllBoards),
      takeLatest(GET_BOARD, getBoard),
      takeLatest(UPDATE_BOARD, updateBoard),

      // Tasks
      takeLatest(CREATE_TASK, createTask),

      //Columns
      takeLatest(CREATE_COLUMN, createColumn),
      takeLatest(UPDATE_COLUMN, updateColumn)
    ]);
  }
];
