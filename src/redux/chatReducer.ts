import { InferActionsTypes } from "./reduxStore";

const initialState = {
  chatMessages: [] as [] | Array<ChatMessageType>,
};

const chatReducer = (
  state: initialStateType = initialState,
  action: chatReducerActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SET_CHAT_MESSAGES/chatReducer":
      return {
        ...state,
        chatMessages: [...state.chatMessages, ...action.messages],
      };
    default:
      return state;
  }
};

export const actions = {
  setChatMessages: (messages: Array<ChatMessageType>) => {
    return {
      type: "SET_CHAT_MESSAGES/chatReducer",
      messages,
    } as const;
  },
};

export default chatReducer;

type ChatMessageType = {
  message: string;
  userId: number;
  userName: string;
  photo: string | null;
};
type initialStateType = typeof initialState;
type chatReducerActionsTypes = InferActionsTypes<typeof actions>;
