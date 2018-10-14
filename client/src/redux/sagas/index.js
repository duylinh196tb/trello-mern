import { all, fork } from "redux-saga/effects";
import boards from "./boards";
const rootSaga = function*() {
  yield all([...boards.map(watcher => fork(watcher))]);
};
export default rootSaga;
