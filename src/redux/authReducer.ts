import { InferActionsTypes, ThunkType } from "./reduxStore";
import { ProfileType } from "../types/types";
import { FormAction, stopSubmit } from "redux-form";
import { CaptchaResultCodes, ResultCodes } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";

const initialState = {
  id: null as number | null, // * owner id
  email: null as string | null, // * owner email
  login: null as string | null, // * owner login
  isAuth: false,
  userProfile: null as ProfileType | null, // * owner profile
  captchaImage: null as string | null, // * captcha url
};

let authReducer = (
  state = initialState,
  action: AuthReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA/AUTH_REDUCER":
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
      };
    case "SET_USER_PROFILE/AUTH_REDUCER":
      return {
        ...state,
        userProfile: action.profile,
      };
    case "SET_CAPTCHA_IMAGE/AUTH_REDUCER":
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
      type: "SET_USER_DATA/AUTH_REDUCER",
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
      type: "SET_USER_PROFILE/AUTH_REDUCER",
      profile,
    } as const;
  },
  setCaptchaImage: (captchaImage: string | null) => {
    return {
      type: "SET_CAPTCHA_IMAGE/AUTH_REDUCER",
      captchaImage,
    } as const;
  },
};

export let getAuth = (): AuthThunkType => async (dispatch) => {
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
): AuthThunkType => {
  return async (dispatch) => {
    try {
      let data = await authAPI.login(email, password, rememberMe, captcha);
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuth());
        dispatch(actions.setCaptchaImage(null));
      } else if (data.resultCode === CaptchaResultCodes.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
        dispatch(stopSubmit("login", { _error: message }));
      } else {
        dispatch(stopSubmit("login", { _error: message }));
      }
    } catch (error: any) {
      console.log(error);

      dispatch(stopSubmit("login", { _error: error.message }));
    }
  };
};
export let logout = (): AuthThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCodes.Success) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};
export let getCaptchaUrl = (): AuthThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptcha();
  let captchaImage = data.url;
  dispatch(actions.setCaptchaImage(captchaImage));
};

export default authReducer;

export type InitialStateType = typeof initialState;
export type AuthThunkType = ThunkType<AuthReducerActionTypes | FormAction>;
type AuthReducerActionTypes = InferActionsTypes<typeof actions>;

//todo: user avatar near the login
