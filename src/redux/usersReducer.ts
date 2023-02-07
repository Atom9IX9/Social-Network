import { UserType } from "../types/types";
import { usersAPI } from "../api/usersAPI";
import { updateArrayObj } from "../utils/objectHelpers";
import { ThunkAction } from "redux-thunk";
import { InferActionsTypes, rootStateType } from "./reduxStore";
import { Dispatch } from "redux";

const FOLLOW = "FOLLOW/usersReducer";
const UNFOLLOW = "UNFOLLOW/usersReducer";
const SET_USERS = "SET_USERS/usersReducer";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE/usersReducer";
const SET_TOTAL_USER_COUNT = "SET_TOTAL_USER_COUNT/usersReducer";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING/usersReducer";
const TOGGLE_IS_FOLLOW_REQUEST = "TOGGLE_IS_FOLLOW_REQUEST/usersReducer";

export type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  isFetching: boolean;
  isFollowRequest: Array<number>;
};
let initialState: InitialStateType = {
  users: [], // * array of users
  pageSize: 10, // * count of users in one page
  totalItemsCount: 0, // * total users count
  currentPage: 1,
  isFetching: false,
  isFollowRequest: [], // * array of users ids
};

type UsersReducerActionType = InferActionsTypes<typeof actions>;

type ThunkType = ThunkAction<
  Promise<void>,
  rootStateType,
  unknown,
  UsersReducerActionType
>;

type DispatchType = Dispatch<UsersReducerActionType>;

const usersReducer = (
  state = initialState,
  action: UsersReducerActionType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateArrayObj(state.users, "id", action.userId, {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateArrayObj<UserType, number>(
          state.users,
          "id",
          action.userId,
          {
            followed: false,
          }
        ),
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

export const actions = {
  followSuccess: (userId: number) => {
    return {
      type: FOLLOW,
      userId,
    } as const;
  },
  unfollowSuccess: (userId: number) => {
    return {
      type: UNFOLLOW,
      userId,
    } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return {
      type: SET_USERS,
      users,
    } as const;
  },
  setCurrentPage: (page: number) => {
    return {
      type: SET_CURRENT_PAGE,
      page,
    } as const;
  },
  setTotalUsersCount: (totalItemsCount: number) => {
    return {
      type: SET_TOTAL_USER_COUNT,
      totalItemsCount,
    } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const;
  },
  toggleIsFollowing: (isFollowing: boolean, userId: number) => {
    return {
      type: TOGGLE_IS_FOLLOW_REQUEST,
      isFollowing,
      userId,
    } as const;
  },
};

export let getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
  };
};
let __followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) =>
    | ReturnType<typeof actions.followSuccess>
    | ReturnType<typeof actions.unfollowSuccess>
) => {
  dispatch(actions.toggleIsFollowing(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
    dispatch(actions.toggleIsFollowing(false, userId));
  }
};
export let follow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = actions.followSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};
export let unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = actions.unfollowSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};
export default usersReducer;
