import { ContactType, MessageType } from "./messagesReducer";
import { ProfileType, UserType } from "./../types/types";
import { rootStateType } from "./reduxStore";
// * App
export const getAppInitialized = (state: rootStateType): boolean | string => {
  return state.app.initialized;
};

// * Users
export const getStateUsers = (state: rootStateType): Array<UserType> => {
  return state.usersPage.users; // * get array of users
};

export const getStatePageSize = (state: rootStateType): number => {
  return state.usersPage.pageSize; // * get count of users in one page
};

export const getStateTotalUsersCount = (state: rootStateType): number => {
  return state.usersPage.totalItemsCount; // * get total users count
};

export const getStateCurrentPage = (state: rootStateType): number => {
  return state.usersPage.currentPage;
};

export const getStateIsFetching = (state: rootStateType): boolean => {
  return state.usersPage.isFetching;
};

export const getStateIsFollowRequest = (
  state: rootStateType
): Array<number> => {
  return state.usersPage.isFollowRequest; // * get array of users ids
};

export const getTerm = (state: rootStateType): string => {
  return state.usersPage.filter.term;
};

export const getFriendFilter = (state: rootStateType): boolean | null => {
  return state.usersPage.filter.friend;
}

// * Messages
export const getMessagesContacts = (
  state: rootStateType
): Array<ContactType> => {
  return state.messagesPage.contacts;
};

export const getMessages = (state: rootStateType): Array<MessageType> => {
  return state.messagesPage.messages;
};

// * Profile
export const getProfile = (state: rootStateType): ProfileType | null => {
  return state.profilePage.profile;
};

export const getMyProfileId = (state: rootStateType): number | null => {
  return state.auth.id; // * get owner id
};

export const getProfileStatus = (state: rootStateType): string | null => {
  return state.profilePage.status;
};

// * all Content
export const getIsActiveNav = (state: rootStateType): boolean => {
  return state.allContent.isActiveNav;
};
