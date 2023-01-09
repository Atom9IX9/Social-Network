import { usersAPI } from "../api/api";
import { updateArrayObj } from "../utils/objectHelpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USER_COUNT = "SET_TOTAL_USER_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOW_REQUEST = "TOGGLE_IS_FOLLOW_REQUEST";

let initialState = {
  users: [],
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowRequest: [],
};

const usersReducer = (state = initialState, action) => {
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

export let followSuccess = (userId) => {
  return {
    type: FOLLOW,
    userId,
  };
};

export let unfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

export let setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export let setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    page,
  };
};

export let setTotalUsersCount = (totalItemsCount) => {
  return {
    type: SET_TOTAL_USER_COUNT,
    totalItemsCount,
  };
};

export let toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export let toggleIsFollowing = (isFollowing, userId) => {
  return {
    type: TOGGLE_IS_FOLLOW_REQUEST,
    isFollowing,
    userId,
  };
};

export let getUsers = (currentPage, pageSize) => async (dispatch) => {
  //console.warn("Pleas apdate values");
  dispatch(toggleIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pageSize); //
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items)); //
  dispatch(setTotalUsersCount(data.totalCount)); //
  dispatch(setCurrentPage(currentPage)); //
};

let followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleIsFollowing(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
    dispatch(toggleIsFollowing(false, userId));
  }
};

export let follow = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.follow.bind(usersAPI);
  let actionCreator = followSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
};

export let unfollow = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.unfollow.bind(usersAPI);
  let actionCreator = unfollowSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
};

export default usersReducer;
