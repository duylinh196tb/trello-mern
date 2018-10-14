import {
  CREATE_BOARD,
  SAVE_CREATE_BOARD,
  GET_ALL_BOARDS,
  GET_BOARD,
  DELETE_BOARD,
  UPDATE_BOARD,
  SAVE_GET_ALL_BOARDS,
  SAVE_GET_BOARD
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
