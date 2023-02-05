import { rootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { ProfileType } from "../types/types";
import { stopSubmit } from "redux-form";
import {
  authAPI,
  CaptchaResultCodes,
  ResultCodes,
  securityAPI,
} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA/AUTH_REDUCER";
const SET_USER_PROFILE = "SET_USER_PROFILE/AUTH_REDUCER";
const SET_CAPTCHA_IMAGE = "SET_CAPTCHA_IMAGE/AUTH_REDUCER";

type AuthReducerActionTypes =
  | SetUserDataActionType
  | setCaptchaImageActionType
  | SetUserProfileActionType

export type ThunkType = ThunkAction<
  Promise<void>,
  rootStateType,
  unknown,
  AuthReducerActionTypes
>;

export type InitialStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  userProfile: ProfileType | null;
  captchaImage: string | null;
};
const initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  userProfile: null,
  captchaImage: null,
};

let authReducer = (
  state = initialState,
  action: AuthReducerActionTypes
): InitialStateType => {
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
    case SET_CAPTCHA_IMAGE:
      return {
        ...state,
        captchaImage: action.captchaImage,
      };
    default:
      return state;
  }
};

type SetUserDataActionDataType = {
  id: number | null;
  email: string | null;
  login: string | null;
};
type SetUserDataActionType = {
  type: typeof SET_USER_DATA;
  data: SetUserDataActionDataType;
  isAuth: boolean;
};
export let setUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetUserDataActionType => {
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

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export let setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export let getAuth = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === ResultCodes.Success) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export let login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    try {
      let data = await authAPI.login(email, password, rememberMe, captcha);
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuth());
        dispatch(setCaptchaImage(null));
      } else if (data.resultCode === CaptchaResultCodes.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
        // @ts-ignore
        dispatch(stopSubmit("login", { _error: message }));
      } else {
        // @ts-ignore
        dispatch(stopSubmit("login", { _error: message }));
      }
    } catch (error: any) {
      // @ts-ignore 
      dispatch(stopSubmit("login", { _error: error.message }));
    }
  };

export let logout = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCodes.Success) {
    dispatch(setUserData(null, null, null, false));
  }
};

type setCaptchaImageActionType = {
  type: typeof SET_CAPTCHA_IMAGE;
  captchaImage: string | null;
};
let setCaptchaImage = (
  captchaImage: string | null
): setCaptchaImageActionType => {
  return {
    type: SET_CAPTCHA_IMAGE,
    captchaImage,
  };
};

export let getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptcha();
  let captchaImage = data.url;
  dispatch(setCaptchaImage(captchaImage));
};

export default authReducer;

//todo: user avatar near the login
