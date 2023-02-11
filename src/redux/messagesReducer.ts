import { FormAction, reset } from "redux-form";
import { InferActionsTypes, ThunkType } from "./reduxStore";

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

let messagesReducer = (
  state = initialState,
  action: MessagesReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case "ADD-MESSAGE/messagesReducer":
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

export const actions = {
  addNewMessage: (message: string, isMy: boolean) => {
    return { type: "ADD-MESSAGE/messagesReducer", message, isMy } as const;
  },
};

export const addMessageFromForm = (
  formData: MessageFormDataType
): MessagesThunkType => {
  return (dispatch) => {
    if (formData.newMessage) {
      dispatch(actions.addNewMessage(formData.newMessage, true));
      dispatch(reset("messages"));
    }
  };
};

export default messagesReducer;

export type InitialStateType = typeof initialState;
type MessagesReducerActionTypes = InferActionsTypes<typeof actions>;
type MessagesThunkType = ThunkType<
  MessagesReducerActionTypes | FormAction,
  void
>;
export type MessageFormDataType = { newMessage: string };
export type MessageType = { messageId: number; message: string; isMy: boolean };
export type ContactType = { contactId: number; name: string };
