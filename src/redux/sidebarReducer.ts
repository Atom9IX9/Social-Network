let initialState = {
  friends: [
    { name: "Dima", id: 1 },
    { name: "Mom", id: 2 },
    { name: "Danylo", id: 3 },
  ],
  links: [
    { path: "/profile", linkName: "Profile", linkId: 1 },
    { path: "/messages", linkName: "Messages", linkId: 2 },
    { path: "/news", linkName: "News", linkId: 3 },
    { path: "/music", linkName: "Music", linkId: 4 },
    { path: "/settings", linkName: "Settings", linkId: 5 },
    { path: "/users", linkName: "Users", linkId: 6 },
  ],
};

let sidebarReducer = (state = initialState): InitialStateType => {
  return state
};

export default sidebarReducer;

export type InitialStateType = typeof initialState;
export type SidebarFriendType = { name: string; id: number };
export type SidebarLinkType = {
  path: string;
  linkName: string;
  linkId: number;
};
