import {
  SAVE_GET_BOARD,
  SAVE_CREATE_TASK,
  SAVE_CREATE_COLUMN,
  SAVE_UPDATE_BOARD
} from "../actions/types";
import update from "immutability-helper";

const initialState = {
  _id: "",
  title: "",
  columnOrder: [],
  tasks: [],
  columns: [],
  users: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // Board
    case SAVE_GET_BOARD:
      return { ...payload };
    case SAVE_UPDATE_BOARD:
      return { ...state, ...payload };

    // task
    case SAVE_CREATE_TASK:
      const index = state.columns.findIndex((e, i) => {
        return e._id === payload.column;
      });
      return update(state, {
        tasks: { $push: [{ _id: payload._id, content: payload.content }] },
        columns: { [index]: { taskOrder: { $push: [payload._id] } } }
      });

    // column
    case SAVE_CREATE_COLUMN:
      return update(state, {
        columnOrder: { $push: [payload._id] },
        columns: { $push: [{ ...payload }] }
      });
    default:
      return state;
  }
};
