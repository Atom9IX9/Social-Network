import { ProfileType } from "../types/types";
import profileReducer, { actions } from "./profileReducer";

let state = {
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

describe("profile reducer actions tests", () => {
  let newProfile: ProfileType = {
    userId: 2,
    lookingForAJob: true,
    lookingForAJobDescription: "js, ts, react, vue",
    fullName: "nick",
    aboutMe: "some info",
    contacts: {
      facebook: null,
      github: null,
      twitter: null,
      vk: null,
      instagram: null,
      website: null,
      youtube: null,
      mainLink: null,
    },
    photos: {
      small: null,
      large: null,
    },
  };

  it("length of posts should be incremented", () => {
    let result = profileReducer(state, actions.addPost("post"));
    expect(result.posts.length).toBe(6);
  });

  it("status should be updated", () => {
    let result = profileReducer(state, actions.setStatus("status"));
    expect(result.status).toBe("status");
  });

  it("likes should be incremented", () => {
    let result = profileReducer(state, actions.addLike(1, 0));
    expect(result.posts[0].likes).toBe(1);
  });

  it("photos should be updated", () => {
    let newPhotos = {
      small: "https://some-photo/small",
      large: "https://some-photo/large",
    };
    let newState = profileReducer(state, actions.setUserProfile(newProfile));
    let result = profileReducer(newState, actions.saveAvatarSuccess(newPhotos));
    if (result.profile) expect(result.profile.photos).toStrictEqual(newPhotos);
  });

  it("new profile should be added", () => {
    let result = profileReducer(state, actions.setUserProfile(newProfile));
    expect(result.profile).toStrictEqual(newProfile);
  });

  it("profile should be deleted", () => {
    let result = profileReducer(state, actions.setUserProfile(null));
    expect(result.profile).toBe(null);
  });
});
