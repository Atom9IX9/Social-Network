import { InferActionsTypes } from "./reduxStore";
let initialState = {
  friends: [
    { name: "Dima", id: 1 },
    { name: "Mom", id: 2 },
    { name: "Danylo", id: 3 },
  ],
};

let sidebarReducer = (
  state = initialState,
  action: SidebarActionsTypes
): InitialStateType => {
  return state
};

export const actions = {
};

export default sidebarReducer;

export type InitialStateType = typeof initialState;
export type SidebarFriendType = { name: string; id: number };
export type SidebarLinkType = {
  path: string;
  linkName: string;
  linkId: number;
};
export type SidebarActionsTypes = InferActionsTypes<typeof actions>;
