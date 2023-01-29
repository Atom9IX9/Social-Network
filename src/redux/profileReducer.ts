// import { reset, stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { updateArrayObj } from "../utils/objectHelpers";

const ADD_POST = "ADD-POST/PROFILE_REDUCER";
const SET_USER_PROFILE = "profile_SET_USER_PROFILE/PROFILE_REDUCER";
const SET_STATUS = "SET_STATUS/PROFILE_REDUCER";
const SAVE_PHOTOS_SUCCESS = "SAVE_PHOTOS_SUCCESS/PROFILE_REDUCER";
const ADD_LIKE = "ADD_LIKE/PROFILE_REDUCER";

export type InitialStateType = {
  posts: Array<{ postId: number; text: string; likes: number; liked: boolean }>;
  profile: any;
  status: string | null;
};
const initialState: InitialStateType = {
  posts: [
    { postId: 1, text: "It's my first post!", likes: 10, liked: false },
    { postId: 2, text: "It's my second post!", likes: 5, liked: false },
    { postId: 3, text: "Check my photos!", likes: 10, liked: false },
    { postId: 4, text: "How're you?", likes: 11, liked: false },
    { postId: 5, text: "It's my last post(", likes: 1, liked: false },
  ],
  profile: null,
  status: "",
};

let profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            postId: state.posts.length + 1,
            text: action.text,
            likes: 0,
            liked: false,
          },
        ],
      };
    case ADD_LIKE:
      return {
        ...state,
        posts: updateArrayObj(state.posts, action.id, "postId", {
          likes: action.newLikesCount,
          liked: true,
        }),
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
    case SAVE_PHOTOS_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

type addPostActionType = {
  type: typeof ADD_POST;
  text: string;
};
export const addPost = (text: string): addPostActionType => {
  return { type: ADD_POST, text };
};

type addLikeActionType = {
  type: typeof ADD_LIKE;
  id: number;
  newLikesCount: number;
};
export const addLike = (
  id: number,
  newLikesCount: number
): addLikeActionType => {
  return { type: ADD_LIKE, id, newLikesCount };
};

type saveAvatarSuccessActionType = {
  type: typeof SAVE_PHOTOS_SUCCESS;
  photos: any;
};
const saveAvatarSuccess = (photos: any): saveAvatarSuccessActionType => {
  return { type: SAVE_PHOTOS_SUCCESS, photos };
};

export const addPostFromForm = (formData: any) => (dispatch: any) => {
  if (formData.newPostText) {
    dispatch(addPost(formData.newPostText));
    // dispatch(reset("myPosts"));
  }
};

type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: any;
};
export const setUserProfile = (profile: any): setUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export const getUserProfile = (userId: number, myProfileId?: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId, myProfileId);
    dispatch(setUserProfile(data));
  };
};

type setStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): setStatusActionType => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const getUserStatus =
  (userId: number, myProfileId?: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId, myProfileId);

    dispatch(setStatus(data));
  };

export const updateUserStatus = (status: string) => async (dispatch: any) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const saveAvatar = (file: any) => async (dispatch: any) => {
  let data = await profileAPI.saveAvatar(file);
  if (data.resultCode === 0) {
    dispatch(saveAvatarSuccess(data.data.photos));
  }
};

const getErrorsFromMessages = (messages: Array<any>) => {
  if (!messages.length) return {};

  let errors = Object.keys(messages).reduce((acc, key: any) => {
    let errorMessageName = messages[key].split("->");
    let interfaceMessage = messages[key].split("(")[0];
    errorMessageName = errorMessageName[1]
      .slice(0, errorMessageName[1].length - 1)
      .toLowerCase();
    return { ...acc, [errorMessageName]: interfaceMessage };
  }, {});

  return { ...errors, _error: true };
};

export const saveChangedProfile = (formData: any) => async (dispatch: any) => {
  let data = await profileAPI.saveChangedProfile(formData);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(formData.userId));
  } else {
    dispatch(
      // stopSubmit("aboutUserForm", {
      //   contacts: getErrorsFromMessages(data.messages),
      // })
    );
    return Promise.reject();
  }
};

export default profileReducer;
