import { reset } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "profile_SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { postId: 1, text: "It's my first post!", likes: 10 },
    { postId: 2, text: "It's my second post!", likes: 5 },
    { postId: 3, text: "Check my photos!", likes: 10 },
    { postId: 4, text: "How're you?", likes: 11 },
    { postId: 5, text: "It's my last post(", likes: 1 },
  ],
  // ! in profile value must be ">null<" but this is a test in offline mode !
  profile: null /*{
    fullName: "user",
    aboutMe: "",
    photos: {
      small: null,
      large: null,
    },
    lookingForAJob: true,
    lookingForAJobDescription: "front-end",
  }*/,
  status: "",
};

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          { postId: state.posts.length + 1, text: action.text, likes: 0 },
        ],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const addPost = (text) => {
  return { type: ADD_POST, text };
};

export const addPostFromForm = (formData) => (dispatch) => {
  if (formData.newPostText) {
    dispatch(addPost(formData.newPostText));
    dispatch(reset("myPosts"));
  }
};

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export const getUserProfile = (userId, myProfileId) => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId, myProfileId);
    dispatch(setUserProfile(data));
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const getUserStatus = (userId, myProfileId) => async (dispatch) => {
  let data = await profileAPI.getStatus(userId, myProfileId);
  dispatch(setStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
