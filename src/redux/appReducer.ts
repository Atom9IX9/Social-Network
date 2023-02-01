import { rootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { getAuth } from "./authReducer";

const SET_INITIALIZED = "app_REDUCER_SET_INITIALIZED";
const SET_INITIALIZED_ERROR = "app_REDUCER_SET_INITIALIZED_ERROR";

type AppReducerActionTypes =
  | InitializedSuccessActionType
  | SetInitializedErrorActionType;

type ThunkType = ThunkAction<
  void,
  rootStateType,
  unknown,
  AppReducerActionTypes
>;

export type InitialStateType = {
  initialized: boolean | string;
};
const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (
  state = initialState,
  action: AppReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case SET_INITIALIZED_ERROR:
      return {
        ...state,
        initialized: action.error,
      };
    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof SET_INITIALIZED;
};

export const setInitializedSuccess = (): InitializedSuccessActionType => {
  return {
    type: SET_INITIALIZED,
  };
};

type SetInitializedErrorActionType = {
  type: typeof SET_INITIALIZED_ERROR;
  error: string;
};

export const setInitializedError = (
  error: string
): SetInitializedErrorActionType => {
  return {
    type: SET_INITIALIZED_ERROR,
    error,
  };
};

export const initialize = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise])
    .then(() => {
      dispatch(setInitializedSuccess());
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK")
        dispatch(setInitializedError(error.code));
    });
  // dispatch(setInitializedSuccess());
};

export default appReducer;
