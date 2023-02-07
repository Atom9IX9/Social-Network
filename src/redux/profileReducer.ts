import { InferActionsTypes, rootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { ContactsType, PhotosType } from "./../types/types";
import { ProfileType } from "../types/types";
import { reset, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { updateArrayObj } from "../utils/objectHelpers";

type ProfileReducerActionTypes = InferActionsTypes<typeof actions>;

export type ThunkType = ThunkAction<
  Promise<void>,
  rootStateType,
  unknown,
  ProfileReducerActionTypes
>;

export type PostType = {
  postId: number;
  text: string;
  likes: number;
  liked: boolean;
};
export type InitialStateType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
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
  profile: null, // * selected user profile
  status: "", // * selected user status
};

// prettier-ignore
let profileReducer = (state = initialState, action: ProfileReducerActionTypes): InitialStateType => {
  switch (action.type) {
    case "ADD_POST":
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
    case " ADD_LIKE":
      return {
        ...state,
        posts: updateArrayObj<PostType, number>(
          state.posts,
          "postId",
          action.id,
          {
            likes: action.likes,
            liked: true,
          }
        ),
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SAVE_PHOTOS_SUCCESS":
      if (!state.profile) return state;
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

export const actions = {
  addPost: (text: string) => {
    return { type: "ADD_POST", text } as const;
  },
  addLike: (id: number, likes: number) => {
    return { type: " ADD_LIKE", id, likes: likes + 1 } as const;
  },
  saveAvatarSuccess: (photos: PhotosType) => {
    return { type: "SAVE_PHOTOS_SUCCESS", photos } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: "SET_USER_PROFILE",
      profile,
    } as const;
  },
  setStatus: (status: string) => {
    return {
      type: "SET_STATUS",
      status,
    } as const;
  },
};

// prettier-ignore
export const getUserProfile = (userId: number | null, myProfileId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId, myProfileId);
    dispatch(actions.setUserProfile(data));
  };
};
// prettier-ignore
export const getUserStatus = (userId: number, myProfileId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId, myProfileId);
    dispatch(actions.setStatus(data));
  };
};
export const updateUserStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };
};
export const saveAvatar = (file: any): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.saveAvatar(file);
    if (data.resultCode === 0) {
      dispatch(actions.saveAvatarSuccess(data.data.photos));
    }
  };
};
export type addPostFromFormFormDataType = {
  newPostText: string;
};
type AddPostFromFormThunkType = ThunkAction<
  void,
  rootStateType,
  unknown,
  ProfileReducerActionTypes
>;
// prettier-ignore
export const addPostFromForm = (formData: addPostFromFormFormDataType): AddPostFromFormThunkType => {
  return (dispatch) => {
    if (formData.newPostText) {
      dispatch(actions.addPost(formData.newPostText));
      // @ts-ignore //! should delete ignore
      dispatch(reset("myPosts"));
    }
  }
}
const __getErrorsFromMessages = (messages: Array<string>) => {
  let errors = Object.keys(messages).reduce((acc, key: any) => {
    let errorMessage = messages[key].split("->");
    let interfaceMessage = messages[key].split("(")[0];
    let errorMessageName = errorMessage[1].slice(0, errorMessage[1].length - 1);
    errorMessageName =
      errorMessageName[0].toLowerCase() +
      errorMessageName.slice(1, errorMessageName.length);
    console.log(errorMessageName);

    return { ...acc, [errorMessageName]: interfaceMessage };
  }, {});

  return { ...errors };
};
export type saveChangedProfileFormDataType = {
  formData: ProfileType;
  userId: number;
  ownerId: number;
};
export type SaveProfileDataType = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
};
export const saveChangedProfile =
  (formData: ProfileType, ownerId: number, userId: number | null): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.saveChangedProfile(formData);
    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId, ownerId));
    } else {
      dispatch(
        // @ts-ignore //! should delete ignore
        stopSubmit("aboutUserForm", {
          contacts: __getErrorsFromMessages(data.messages),
        })
      );
      return Promise.reject();
    }
  };

export default profileReducer;
