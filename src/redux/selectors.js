// * App
export const getAppInitialized = (state) => {
  return state.app.initialized;
};

// * Users
export const getStateUsers = (state) => {
  return state.usersPage.users;
};

export const getStatePageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getStateTotalUsersCount = (state) => {
  return state.usersPage.totalItemsCount;
};

export const getStateCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getStateIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getStateIsFollowRequest = (state) => {
  return state.usersPage.isFollowRequest;
};

// * Messages
export const getMessagesContacts = (state) => {
  return state.messagesPage.contacts;
};

export const getMessages = (state) => {
  return state.messagesPage.messages;
};

// * Profile
export const getProfile = (state) => {
  return state.profilePage.profile;
};

export const getMyProfileId = (state) => {
  return state.auth.id;
};

export const getProfileStatus = (state) => {
  return state.profilePage.status;
};

// * all Content
export const getIsActiveNav = (state) => {
  return state.allContent.isActiveNav;
}