import usersReducer, {
  actions,
  follow,
  InitialStateType,
  unfollow,
} from "./usersReducer";
import { usersAPI } from "../api/usersAPI";
import { ResponseType, ResultCodes } from "../api/api";

const result: ResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
};

jest.mock("../api/usersAPI");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        followed: false,
        id: 1,
        name: "user1",
        status: "status of user1",
        photos: {
          small: null,
          large: null,
        },
      },
      {
        followed: true,
        id: 2,
        name: "user2",
        status: "status of user2",
        photos: {
          small: null,
          large: null,
        },
      },
      {
        followed: false,
        id: 3,
        name: "user3",
        status: "status of user3",
        photos: {
          small: null,
          large: null,
        },
      },
      {
        followed: true,
        id: 4,
        name: "user4",
        status: "status of user4",
        photos: {
          small: null,
          large: null,
        },
      },
    ], // * array of users
    pageSize: 10, // * count of users in one page
    totalItemsCount: 0, // * total users count
    currentPage: 1,
    isFetching: false,
    isFollowRequest: [], // * array of users ids
    filter: { term: "", friend: null },
  };
});

describe("users reducer actions tests", () => {
  test("follow should be success", () => {
    const newState = usersReducer(state, actions.followSuccess(1));
    expect(newState.users[0].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
  });
  test("unfollow should be success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2));
    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
  });
  test("filter should be updated", () => {
    const newState = usersReducer(state, actions.setFilter("some term", null));
    expect(newState.filter.term).toBe("some term");
  });
});

describe("users reducer thunks tests", () => {
  test("follow thunk should be success", async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
    let thunk = follow(1);
    const dispatch = jest.fn();
    const getState = jest.fn();
    await thunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      actions.toggleIsFollowing(true, 1)
    );
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      actions.toggleIsFollowing(false, 1)
    );
  });
  test("unfollow thunk should be success", async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    let thunk = unfollow(2);
    const dispatch = jest.fn();
    const getState = jest.fn();
    await thunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      actions.toggleIsFollowing(true, 2)
    );
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2));
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      actions.toggleIsFollowing(false, 2)
    );
  });
});
