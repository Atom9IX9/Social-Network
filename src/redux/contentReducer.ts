import { InferActionsTypes } from "./reduxStore";

const TOGGLE_NAV = "TOGGLE_NAV";

type contentReducerActionsTypes = InferActionsTypes<typeof actions>;

export type InitialStateType = {
  isActiveNav: boolean;
};
let initialState: InitialStateType = {
  isActiveNav: false,
};

const contentReducer = (
  state = initialState,
  action: contentReducerActionsTypes
) => {
  switch (action.type) {
    case TOGGLE_NAV:
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
      type: TOGGLE_NAV,
      isActive,
    } as const;
  },
};

export default contentReducer;
