import { getAuth } from "./authReducer";

const initialState = {
  initialized: false,
}

const SET_INITIALIZED = "app_REDUCER_SET_INITIALIZED";

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const setInitializedSuccess = () => {
  return {
    type: SET_INITIALIZED,
  }
}

export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuth())
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess())
  })
}

export default appReducer