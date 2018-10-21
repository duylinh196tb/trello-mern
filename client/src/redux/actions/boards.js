import {
  CREATE_BOARD,
  SAVE_CREATE_BOARD,
  GET_ALL_BOARDS,
  GET_BOARD,
  DELETE_BOARD,
  UPDATE_BOARD,
  SAVE_GET_ALL_BOARDS,
  SAVE_GET_BOARD,
  // TASKS
  CREATE_TASK,
  CREATE_COLUMN,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_COLUMN,
  DELETE_COLUMN
} from "./types";

export const actCreateBoard = (...args) => ({
  type: CREATE_BOARD,
  args
});

export const actGetAllBoards = (...args) => ({
  type: GET_ALL_BOARDS,
  args
});

export const actGetBoard = (...args) => ({
  type: GET_BOARD,
  args
});

export const actDeleteBoard = (...args) => ({
  type: DELETE_BOARD,
  args
});

export const actUpdateBoard = (...args) => ({
  type: UPDATE_BOARD,
  args
});

// SAVE

export const saveCreateBoard = payload => ({
  type: SAVE_CREATE_BOARD,
  payload
});

export const saveAllBoards = payload => ({
  type: SAVE_GET_ALL_BOARDS,
  payload
});

export const saveBoard = payload => ({
  type: SAVE_GET_BOARD,
  payload
});

// TASKS

export const actCreateTask = (...args) => ({
  type: CREATE_TASK,
  args
});

export const actUpdateTask = (...args) => ({
  type: UPDATE_TASK,
  args
});

export const actDeleteTask = (...args) => ({
  type: DELETE_TASK,
  args
});

// COLUMNS
export const actCreateColumn = (...args) => ({
  type: CREATE_COLUMN,
  args
});

export const actUpdateColumn = (...args) => ({
  type: UPDATE_COLUMN,
  args
});

export const actDeleteColumn = (...args) => ({
  type: DELETE_COLUMN,
  args
});
