import { UserType } from "../types/types";
import { usersAPI } from "../api/usersAPI";
import { updateArrayObj } from "../utils/objectHelpers";
import { InferActionsTypes, ThunkType } from "./reduxStore";
import { Dispatch } from "redux";

let initialState = {
  users: [] as [] | Array<UserType>, // * array of users
  pageSize: 10, // * count of users in one page
  totalItemsCount: 0, // * total users count
  currentPage: 1,
  isFetching: false,
  isFollowRequest: [] as [] | Array<number>, // * array of users ids
};

const usersReducer = (
  state = initialState,
  action: UsersReducerActionType
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW/usersReducer":
      return {
        ...state,
        users: updateArrayObj(state.users, "id", action.userId, {
          followed: true,
        }),
      };
    case "UNFOLLOW/usersReducer":
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
    case "SET_USERS/usersReducer":
      return {
        ...state,
        users: [...action.users],
      };
    case "SET_CURRENT_PAGE/usersReducer":
      return {
        ...state,
        currentPage: action.page,
      };
    case "SET_TOTAL_USER_COUNT/usersReducer":
      return {
        ...state,
        totalItemsCount: action.totalItemsCount,
      };
    case "TOGGLE-IS-FETCHING/usersReducer":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE_IS_FOLLOW_REQUEST/usersReducer":
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
      type: "FOLLOW/usersReducer",
      userId,
    } as const;
  },
  unfollowSuccess: (userId: number) => {
    return {
      type: "UNFOLLOW/usersReducer",
      userId,
    } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return {
      type: "SET_USERS/usersReducer",
      users,
    } as const;
  },
  setCurrentPage: (page: number) => {
    return {
      type: "SET_CURRENT_PAGE/usersReducer",
      page,
    } as const;
  },
  setTotalUsersCount: (totalItemsCount: number) => {
    return {
      type: "SET_TOTAL_USER_COUNT/usersReducer",
      totalItemsCount,
    } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: "TOGGLE-IS-FETCHING/usersReducer",
      isFetching,
    } as const;
  },
  toggleIsFollowing: (isFollowing: boolean, userId: number) => {
    return {
      type: "TOGGLE_IS_FOLLOW_REQUEST/usersReducer",
      isFollowing,
      userId,
    } as const;
  },
};

export let getUsers = (
  currentPage: number,
  pageSize: number
): UsersThunkType => {
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
  apiMethod: typeof usersAPI.follow | typeof usersAPI.unfollow,
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
export let follow = (userId: number): UsersThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = actions.followSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};
export let unfollow = (userId: number): UsersThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = actions.unfollowSuccess;
    __followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};

export default usersReducer;

export type InitialStateType = typeof initialState;
type UsersReducerActionType = InferActionsTypes<typeof actions>;
type UsersThunkType = ThunkType<UsersReducerActionType>;
type DispatchType = Dispatch<UsersReducerActionType>;
