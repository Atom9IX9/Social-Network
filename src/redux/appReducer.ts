import { InferActionsTypes, rootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { getAuth } from "./authReducer";

const SET_INITIALIZED = "app_REDUCER_SET_INITIALIZED";
const SET_INITIALIZED_ERROR = "app_REDUCER_SET_INITIALIZED_ERROR";

type AppReducerActionTypes = InferActionsTypes<typeof actions>;

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

export const actions = {
  setInitializedSuccess: () => {
    return {
      type: SET_INITIALIZED,
    } as const;
  },
  setInitializedError: (error: string) => {
    return {
      type: SET_INITIALIZED_ERROR,
      error,
    } as const;
  },
};

export const initialize = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise])
    .then(() => {
      dispatch(actions.setInitializedSuccess());
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK")
        dispatch(actions.setInitializedError(error.code));
    });
};

export default appReducer;
