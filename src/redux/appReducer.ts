import { InferActionsTypes, ThunkType } from "./reduxStore";
import { getAuth } from "./authReducer";

const initialState = {
  initialized: false as boolean | string,
};

const appReducer = (
  state = initialState,
  action: AppReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_INITIALIZED_SUCCESS/appReducer":
      return {
        ...state,
        initialized: true,
      };
    case "SET_INITIALIZED_ERROR/appReducer":
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
      type: "SET_INITIALIZED_SUCCESS/appReducer",
    } as const;
  },
  setInitializedError: (error: string) => {
    return {
      type: "SET_INITIALIZED_ERROR/appReducer",
      error,
    } as const;
  },
};

export const initialize = (): appThunkType => (dispatch) => {
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


export type InitialStateType = typeof initialState;
type appThunkType = ThunkType<AppReducerActionTypes, void>
type AppReducerActionTypes = InferActionsTypes<typeof actions>;

