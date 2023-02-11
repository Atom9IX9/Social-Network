import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isActiveNav: false,
};

const contentReducer = (
  state = initialState,
  action: contentReducerActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "TOGGLE_NAV/appReducer":
      return {
        ...state,
        isActiveNav: action.isActive,
      };
    default:
      return state;
  }
};

export const actions = {
  toggleNav: (isActive: boolean) => {
    return {
      type: "TOGGLE_NAV/appReducer",
      isActive,
    } as const;
  },
};

export default contentReducer;

export type InitialStateType = typeof initialState;
type contentReducerActionsTypes = InferActionsTypes<typeof actions>;
