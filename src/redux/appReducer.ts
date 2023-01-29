// @ts-ignore
import { getAuth } from "./authReducer";

const SET_INITIALIZED = "app_REDUCER_SET_INITIALIZED";
const SET_INITIALIZED_ERROR = "app_REDUCER_SET_INITIALIZED_ERROR";

export type InitialStateType = {
  initialized: boolean
}
const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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
  type: typeof SET_INITIALIZED
}

export const setInitializedSuccess = (): InitializedSuccessActionType => {
  return {
    type: SET_INITIALIZED,
  };
};
export const setInitializedError = (error: any) => {
  return {
    type: SET_INITIALIZED_ERROR,
    error,
  };
};

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(getAuth());
  Promise.all([promise])
    .then(() => {
      dispatch(setInitializedSuccess());
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK")
        dispatch(setInitializedError(error.code));
    });
};

export default appReducer;
