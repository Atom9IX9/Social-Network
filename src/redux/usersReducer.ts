import { UserType } from "../types/types";
import { usersAPI } from "../api/api";
import { updateArrayObj } from "../utils/objectHelpers";
import { ThunkAction } from "redux-thunk";
import { rootStateType } from "./reduxStore";
import { Dispatch } from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USER_COUNT = "SET_TOTAL_USER_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOW_REQUEST = "TOGGLE_IS_FOLLOW_REQUEST";

export type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  isFetching: boolean;
  isFollowRequest: Array<number>;
};
let initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowRequest: [], // * array of users ids
};

type UsersReducerActionType =
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetUsersActionType
  | setCurrentPageActionType
  | SetTotalItemsCountActionType
  | ToggleIsFetchingActionType
  | ToggleIsFollowingActionType;

type ThunkType = ThunkAction<
  Promise<void>,
  rootStateType,
  unknown,
  UsersReducerActionType
>;

type DispatchType = Dispatch<UsersReducerActionType>

const usersReducer = (
  state = initialState,
  action: UsersReducerActionType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateArrayObj(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateArrayObj(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_TOTAL_USER_COUNT:
      return {
        ...state,
        totalItemsCount: action.totalItemsCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOW_REQUEST:
      return {
        ...state,
        isFollowRequest: action.isFollowing
          ? [...state.isFollowRequest, action.userId]
          : state.isFollowRequest.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export let followSuccess = (userId: number): FollowSuccessActionType => {
  return {
    type: FOLLOW,
    userId,
  };
};

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export let unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export let setUsers = (users: Array<UserType>): SetUsersActionType => {
  return {
    type: SET_USERS,
    users,
  };
};

type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  page: number;
};
export let setCurrentPage = (page: number): setCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    page,
  };
};

type SetTotalItemsCountActionType = {
  type: typeof SET_TOTAL_USER_COUNT;
  totalItemsCount: number;
};
export let setTotalUsersCount = (
  totalItemsCount: number
): SetTotalItemsCountActionType => {
  return {
    type: SET_TOTAL_USER_COUNT,
    totalItemsCount,
  };
};

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export let toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

type ToggleIsFollowingActionType = {
  type: typeof TOGGLE_IS_FOLLOW_REQUEST;
  isFollowing: boolean;
  userId: number;
};
export let toggleIsFollowing = (
  isFollowing: boolean,
  userId: number
): ToggleIsFollowingActionType => {
  return {
    type: TOGGLE_IS_FOLLOW_REQUEST,
    isFollowing,
    userId,
  };
};

export let getUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(currentPage));
  };

let __followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
  dispatch(toggleIsFollowing(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
    dispatch(toggleIsFollowing(false, userId));
  }
};

export let follow =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = followSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };

export let unfollow =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = unfollowSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };

export default usersReducer;
