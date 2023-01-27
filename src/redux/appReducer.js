import { getAuth } from "./authReducer";

const initialState = {
  initialized: false,
};

const SET_INITIALIZED = "app_REDUCER_SET_INITIALIZED";
const SET_INITIALIZED_ERROR = "app_REDUCER_SET_INITIALIZED_ERROR";

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case SET_INITIALIZED_ERROR:
      return {
        ...state,
        initialized: "error",
      };
    default:
      return state;
  }
};

export const setInitializedSuccess = () => {
  return {
    type: SET_INITIALIZED,
  };
};
export const setInitializedError = () => {
  return {
    type: SET_INITIALIZED_ERROR,
  };
};

export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise])
    .then(() => {
      dispatch(setInitializedSuccess());
    })
    .catch(() => {
      dispatch(setInitializedError())
    });
};

export default appReducer;
