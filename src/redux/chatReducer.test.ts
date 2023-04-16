import chatReducer, { actions, initialStateType } from "./chatReducer";

const state: initialStateType = {
  chatMessages: [],
  chatStatus: "connecting"
};

describe("chat tests", () => {
  it("message should be added", () => {
    let newMessages = [
      { message: "new message", photo: null, userId: 1, userName: "name1" },
      { message: "new message 2", photo: null, userId: 2, userName: "name2" },
    ]
    const newState = chatReducer(
      state,
      actions.setChatMessages(newMessages)
    );
    expect(newState.chatMessages).toStrictEqual(newMessages)
  });
});