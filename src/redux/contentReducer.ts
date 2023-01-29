const TOGGLE_NAV = "TOGGLE_NAV";

export type InitialStateType = {
  isActiveNav: boolean;
};
let initialState: InitialStateType = {
  isActiveNav: false,
};

const contentReducer = (state = initialState, action: any) => {
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

type ToggleNavActionType = {
  type: typeof TOGGLE_NAV;
  isActive: boolean;
}
export let toggleNav = (isActive: boolean): ToggleNavActionType => {
  return {
    type: TOGGLE_NAV,
    isActive,
  };
};

export default contentReducer;
