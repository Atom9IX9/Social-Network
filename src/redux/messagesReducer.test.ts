import messagesReducer, { actions } from "./messagesReducer";

let state = {
  contacts: [
    { contactId: 1, name: "Dima" },
    { contactId: 2, name: "Danylo" },
    { contactId: 3, name: "Valera(Ghoster)" },
    { contactId: 4, name: "Mom" },
    { contactId: 5, name: "Windy31" },
  ],
  messages: [
    { messageId: 1, message: "Hello", isMy: false },
    { messageId: 2, message: "Hello", isMy: true },
    { messageId: 3, message: "How are you?", isMy: false },
    { messageId: 4, message: "I'm OK", isMy: true },
    { messageId: 5, message: "Me to", isMy: false },
  ],
};

describe("messages reducer actions tests", () => {
  it("owner message should be added", () => {
    let result = messagesReducer(
      state,
      actions.addNewMessage("new my message", true)
    );
    expect(result.messages[result.messages.length - 1]).toStrictEqual({
      messageId: 6,
      message: "new my message",
      isMy: true,
    });
  });

  it("user message should be added", () => {
    let result = messagesReducer(
      state,
      actions.addNewMessage("new user message", false)
    );
    expect(result.messages[result.messages.length - 1]).toStrictEqual({
      messageId: 6,
      message: "new user message",
      isMy: false,
    });
  });
});
