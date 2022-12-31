let initialState = {
  friends: [{ name: "Dima" }, { name: "Mom" }, { name: "Danylo" }],
  links: [
    { path: "/profile", linkName: "Profile", linkId: 1 },
    { path: "/messages", linkName: "Messages", linkId: 2 },
    { path: "/news", linkName: "News", linkId: 3 },
    { path: "/music", linkName: "Music", linkId: 4 },
    { path: "/settings", linkName: "Settings", linkId: 5 },
    { path: "/users", linkName: "Users", linkId: 6 },
  ],
};

let sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
