import { call, put, take, race } from "redux-saga/effects";
import { delay } from "redux-saga";
import { message } from "antd";

import configs from "../configs/";
import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
  invokeCallback
} from "../actions/common";
import { setAuthState, removeLoggedUser } from "../actions/auth";

export const rejectErrors = res => {
  const { status, data } = res;
  if (!data) {
    return Promise.reject({
      message: res.problem
    });
  }
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  if (data && data.code >= 200 && data.code < 300) {
    return res;
  }
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  // const subData = JSON.parse(data);
  // console.log('subData', subData);
  return Promise.reject({
    code: data.code,
    message: data.message,
    error: data.error,
    //subData.message !== 'There is missing customer email.' ? data.errors[0] : subData.message,
    status
  });
};

// export const respondJson = res => res.data;

// create saga here
// convenient way: [] instead of polymorph, such as item is not array then [item]
// because later changes to code will be so easy, just add new row
export const createRequestSaga = ({
  request,
  key,
  start,
  stop,
  success,
  failure,
  cancelled,
  functionSuccess,
  functionFailure,
  timeout = configs.timeOut,
  cancel,
  /*uploadProgress, downloadProgress, intervalProgress=50, */ blob // eslint-disable-line
}) =>
  // when we dispatch a function, redux-thunk will give it a dispatch
  // while redux-saga will give it an action instead, good for testing
  // we may not needs this if we use redux-saga, of course we can use both
  function*(action) {
    // default is empty
    //saga sẽ lấy được action ở đây, và ở bên actions sẽ truyển vào 1 mảng args
    let args = action.args || [];
    // check to see if we have success callback that pass as a param,
    // so that it will be callback from where it was born
    // with this way we can make something like cleaning the messages
    // define là item cuối của args sẽ là callback, check xem có callback ko?
    const callback =
      typeof args[args.length - 1] === "function"
        ? args[args.length - 1]
        : null;
    if (callback) {
      args = args.slice(0, -1);
    }
    // error first callback
    let ret = null;
    let err = null;

    // store into redux
    //requestKey là key để lưu trữ state trong redux cho request đó
    const requestKey = typeof key === "function" ? key(...args) : key;
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token)
    if (start) {
      for (const actionCreator of start) {
        yield put(actionCreator());
      }
    }
    // mark pending
    yield put(markRequestPending(requestKey));
    try {
      // this is surely Error exception, assume as a request failed
      if (!request) {
        throw new Error("Api method not found!!!");
      }
      // start invoke
      const invokeRequest = async () => {
        const chainRequest = request.apply(request, args);
        // blob support progress
        // if (blob) {
        // if(uploadProgress){
        //   console.log(uploadProgress, intervalProgress)
        //   chainRequest = chainRequest.uploadProgress({ interval : intervalProgress }, function* (uploaded, total){
        //       for(let actionCreator of uploadProgress){
        //         yield put(actionCreator({uploaded, total}, action))
        //       }
        //   })
        // }

        // if(downloadProgress) {
        //   chainRequest = chainRequest.progress({ interval : intervalProgress }, function* (downloaded, total){
        //       for(let actionCreator of downloadProgress){
        //         yield put(actionCreator({downloaded, total}, action))
        //       }
        //   })
        // }
        //   chainRequest = chainRequest.then(res => res.json());
        // } else {
        // chain the request
        // chainRequest = chainRequest
        //.then(rejectErrors)
        // default return empty json when no content
        // .then(respondJson);
        // }
        const response = await chainRequest;
        if (
          response.ok &&
          response.status >= 200 &&
          response.status < 300
          // response.data.code >= 200 &&
          // response.data.code < 300
        ) {
          return response.data;
        }
        if (response.status === 403) {
          message.error("Bạn không có quyền thực hiện hành động này");
        }
        return rejectErrors(response);
      };

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0
      const raceOptions = {
        data: call(invokeRequest),
        isTimeout: call(delay, timeout)
      };
      // đợi action cancel
      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }
      //chay race để thực hiện việc gọi request, timeout và cancel cái nào xong trước thì dừng lại
      const { data, isTimeout, cancelRet } = yield race(raceOptions);
      console.log("Response", data);
      if (isTimeout) {
        throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        // callback on success
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        // callback on success
        if (success) {
          for (const actionCreator of success) {
            yield put(actionCreator(data, action));
          }
        }
        if (functionSuccess) {
          for (const actionCreator of functionSuccess) {
            actionCreator(data);
          }
        }
        // finally mark the request success
        yield put(markRequestSuccess(requestKey));

        // assign data, for cancel both ret and err is null
        ret = data;
      }
    } catch (reason) {
      // unauthorized
      if (reason.code === 401) {
        //   // try refresh token
        //   const token = action.args[0];
        //   // catch exception is safer than just read response status
        //   if (token && token.refreshToken) {
        //     // tell user to wait, no need to catch for more errors this step!!!
        //     yield put(setToast('Refreshing token... You should reload page for sure!'));
        //     // try refresh token, then reload page ?
        //     const { token: newToken } = yield call(auth.refreshAccessToken, token.refreshToken);
        //     // it can return more such as user info, expired date ?
        //     // call action creator to update
        //     yield put(saveRefreshToken(newToken));
        //   } else {
        // call logout user because we do not have refresh token
        yield put(removeLoggedUser());
        yield put(setAuthState(false));
        //go to login
        //   }
      }
      // anyway, we should treat this as error to log
      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }
      if (functionFailure) {
        for (const actionCreator of functionFailure) {
          actionCreator(reason);
        }
      }
      yield put(markRequestFailed(reason, requestKey));

      // mark error
      err = reason;
    } finally {
      if (stop) {
        for (const actionCreator of stop) {
          yield put(actionCreator(ret, action));
        }
      }
      // check if the last param0 is action, should call it as actionCreator
      // from where it is called, we can access action[type and args],
      // so we will use it with first error callback style
      if (callback) {
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
