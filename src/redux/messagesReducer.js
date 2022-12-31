import { reset } from "redux-form";

const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
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

let messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            messageId: state.messages.length + 1,
            message: action.message,
            isMy: action.isMy,
          },
        ],
      };
    default:
      return state;
  }
};

export const addNewMessage = (message, isMy) => {
  return { type: ADD_MESSAGE, message, isMy };
};

export const addMessageFromForm = (formData) => (dispatch) => {
  if (formData.newMessage) {
    dispatch(addNewMessage(formData.newMessage, true));
    dispatch(reset("messages"));
  }
};

export default messagesReducer;
