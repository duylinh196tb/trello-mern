import { SAVE_CREATE_BOARD, SAVE_GET_ALL_BOARDS } from "../actions/types";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_GET_ALL_BOARDS:
      return [...payload];
    case SAVE_CREATE_BOARD:
      return [...state, { ...payload }];
    default:
      return state;
  }
};
