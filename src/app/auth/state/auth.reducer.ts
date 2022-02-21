import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {autoLogout, loginStart, loginSuccess, signupSuccess} from "./auth.action";


const _authReducer = createReducer(
  initialState ,
  on(loginStart , (state, action) => {
    return {
      ...state
    }
  }),
  on(loginSuccess , (state , action)  => {
    return {
      ...state,
      user: action.user,
    }
  }),

  on(signupSuccess ,  (state , action) => {
      return {
        ...state,
        user: action.user,
      }
  }),

  on(autoLogout , state  => {
      return {
        ...state,
        user : null,
      }
  })
);

export function AuthReducer(state , action) {
  return _authReducer(state , action);
}


