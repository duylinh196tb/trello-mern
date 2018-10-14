import { takeLatest, all, put } from "redux-saga/effects";
import {
  APP_LOGIN,
  APP_LOGOUT,
  APP_REGISTER,
  APP_VERIFY_TOKEN
} from "../actions/types";
import auth from "../api/auth";
import {
  setAuthState,
  saveLoggedUser,
  removeLoggedUser
} from "../actions/auth";
import { createRequestSaga } from "./common";
const requestLogin = createRequestSaga({
  request: auth.login,
  key: "login",
  cancel: APP_LOGOUT,
  success: [res => saveLoggedUser(res), () => setAuthState(true)],
  failure: []
});

const requestRegister = createRequestSaga({
  request: auth.register,
  key: "register",
  success: [],
  failure: []
});

const requestVerifyToken = createRequestSaga({
  request: auth.verifyToken,
  key: "verify",
  success: [
    // chuyen vao home
  ],
  failure: [
    //tro lai man login
  ]
});

const requestLogout = function*() {
  yield all([
    yield put(removeLoggedUser()),
    yield put(setAuthState(false))
    // yield put(closeDrawer()),
    // yield put(resetTo('login')),
    // yield put(setToast('Logout successfully!!!'))
  ]);
};

// root saga reducer
export default [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  // other watcher may be background workers
  function* fetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_LOGOUT, requestLogout),
      takeLatest(APP_VERIFY_TOKEN, requestVerifyToken),
      takeLatest(APP_REGISTER, requestRegister)
    ]);
  }
];

// import { all, takeEvery, put, fork } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
// import { getToken, clearToken } from '../../helpers/utility';
// import {
//   LOGIN_SUCCESS,
//   LOGIN_ERROR,
//   LOGOUT,
//   CHECK_AUTHORIZATION
//  } from '../actions/types';

// const fakeApiCall = true; // auth0 or express JWT

// export function* loginRequest() {
//   yield takeEvery('LOGIN_REQUEST', function*() {
//     if (fakeApiCall) {
//       yield put({
//         type: LOGIN_SUCCESS,
//         token: 'secret token',
//         profile: 'Profile'
//       });
//     } else {
//       yield put({ type: LOGIN_ERROR });
//     }
//   });
// }

// export function* loginSuccess() {
//   yield takeEvery(LOGIN_SUCCESS, function*(payload) {
//     yield localStorage.setItem('id_token', payload.token);
//   });
// }

// export function* loginError() {
//   yield takeEvery(LOGIN_ERROR, function*() {});
// }

// export function* logout() {
//   yield takeEvery(LOGOUT, function*() {
//     clearToken();
//     yield put(push('/'));
//   });
// }
// export function* checkAuthorization() {
//   yield takeEvery(CHECK_AUTHORIZATION, function*() {
//     const token = getToken().get('idToken');
//     if (token) {
//       yield put({
//         type: LOGIN_SUCCESS,
//         token,
//         profile: 'Profile'
//       });
//     }
//   });
// }
// export default function* rootSaga() {
//   yield all([
//     fork(checkAuthorization),
//     fork(loginRequest),
//     fork(loginSuccess),
//     fork(loginError),
//     fork(logout)
//   ]);
// }
