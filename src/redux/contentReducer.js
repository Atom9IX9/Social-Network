const TOGGLE_NAV = "TOGGLE_NAV";

let initialState = {
  isActiveNav: false,
};

const contentReducer = (state = initialState, action) => {
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

export let toggleNav = (isActive) => {
  return {
    type: TOGGLE_NAV,
    isActive,
  };
};

export default contentReducer;
