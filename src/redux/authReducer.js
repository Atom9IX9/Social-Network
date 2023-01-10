import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA/AUTH_REDUCER";
const SET_USER_PROFILE = "SET_USER_PROFILE/AUTH_REDUCER";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  userProfile: null,
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile,
      };
    default:
      return state;
  }
};

export let setUserData = (id, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    data: {
      id,
      email,
      login,
    },
    isAuth,
  };
};

export let setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export let getAuth = () => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;

    dispatch(setUserData(id, email, login, true));
  }
};

export let login = (email, password, rememberMe) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe);
  if (data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export let logout = () => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export default authReducer;



//todo: user avatar near the login