// import { Map } from 'immutable';
// import actions from '../actions/auth';

// const initState = new Map({ idToken: null });

// export default function authReducer(state = initState, action) {
//   switch (action.type) {
//     case actions.LOGIN_SUCCESS:
//       return state.set('idToken', action.token);
//     case actions.LOGOUT:
//       return initState;
//     default:
//       return state;
//   }
// }

import {
  APP_SET_AUTH_STATE,
  APP_REMOVE_LOGGED_USER,
  APP_SAVE_LOGGED_USER,
  APP_SAVE_REFRESH_TOKEN
} from "../actions/types";

const init = {
  loggedIn: false,
  token: null,
  refreshToken: null,
  email: ""
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case APP_SET_AUTH_STATE:
      return { ...state, loggedIn: payload || false };
    case APP_SAVE_LOGGED_USER: {
      return {
        ...state,
        email: payload.data.email,
        token: payload.data.token
        // refreshToken: payload.data.refreshToken
      };
    }
    case APP_SAVE_REFRESH_TOKEN:
      return { ...state, token: { ...state.token, ...payload } };
    case APP_REMOVE_LOGGED_USER:
      return { ...state, ...init };

    default:
      return state;
  }
};
