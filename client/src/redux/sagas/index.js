import { all, fork } from "redux-saga/effects";
import boards from "./boards";
import auth from "./auth";
const rootSaga = function*() {
  yield all([
    ...boards.map(watcher => fork(watcher)),
    ...auth.map(watcher => fork(watcher))
  ]);
};
export default rootSaga;
