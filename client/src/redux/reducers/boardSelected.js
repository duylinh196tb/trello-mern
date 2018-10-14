import { SAVE_GET_BOARD } from "../actions/types";
const initialState = {
  _id: "",
  title: "",
  columnOrder: [],
  tasks: [],
  columns: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_GET_BOARD:
      return { ...payload };
    default:
      return state;
  }
};
