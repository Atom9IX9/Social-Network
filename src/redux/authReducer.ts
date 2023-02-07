import { InferActionsTypes, rootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { ProfileType } from "../types/types";
import { stopSubmit } from "redux-form";
import { CaptchaResultCodes, ResultCodes } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";

const SET_USER_DATA = "SET_USER_DATA/AUTH_REDUCER";
const SET_USER_PROFILE = "SET_USER_PROFILE/AUTH_REDUCER";
const SET_CAPTCHA_IMAGE = "SET_CAPTCHA_IMAGE/AUTH_REDUCER";

type AuthReducerActionTypes = InferActionsTypes<typeof actions>;

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
  id: null, // * owner id
  email: null, // * owner email
  login: null, // * owner login
  isAuth: false,
  userProfile: null, // * owner profile
  captchaImage: null, // * captcha url
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

export const actions = {
  setUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => {
    return {
      type: SET_USER_DATA,
      data: {
        id,
        email,
        login,
      },
      isAuth,
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile,
    } as const;
  },
  setCaptchaImage: (captchaImage: string | null) => {
    return {
      type: SET_CAPTCHA_IMAGE,
      captchaImage,
    } as const;
  },
};

export let getAuth = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === ResultCodes.Success) {
    let { id, email, login } = data.data;
    dispatch(actions.setUserData(id, email, login, true));
  }
};
export let login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null
): ThunkType => {
  return async (dispatch) => {
    try {
      let data = await authAPI.login(email, password, rememberMe, captcha);
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuth());
        dispatch(actions.setCaptchaImage(null));
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
};
export let logout = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCodes.Success) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};
export let getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptcha();
  let captchaImage = data.url;
  dispatch(actions.setCaptchaImage(captchaImage));
};

export default authReducer;

//todo: user avatar near the login
