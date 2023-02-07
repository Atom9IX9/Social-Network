import { ThunkAction } from "redux-thunk";
import { reset } from "redux-form";
import { InferActionsTypes, rootStateType } from "./reduxStore";

const ADD_MESSAGE = "ADD-MESSAGE";

type MessagesReducerActionTypes = InferActionsTypes<typeof actions>;

type ThunkType = ThunkAction<
  void,
  rootStateType,
  unknown,
  MessagesReducerActionTypes
>;

export type MessageType = { messageId: number; message: string; isMy: boolean };
export type ContactType = { contactId: number; name: string };
export type InitialStateType = {
  contacts: Array<ContactType>;
  messages: Array<MessageType>;
};
let initialState: InitialStateType = {
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

export const actions = {
  addNewMessage: (message: string, isMy: boolean) => {
    return { type: ADD_MESSAGE, message, isMy } as const;
  },
};

type FormDataType = { newMessage: string };
export const addMessageFromForm = (formData: FormDataType): ThunkType => {
  return (dispatch) => {
    if (formData.newMessage) {
      dispatch(actions.addNewMessage(formData.newMessage, true));
      // @ts-ignore
      dispatch(reset("messages"));
    }
  };
};
export default messagesReducer;
