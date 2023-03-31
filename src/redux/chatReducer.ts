import { ChatStatusType, chatAPI } from "./../api/chatAPI";
import { ChatMessageType } from "../api/chatAPI";
import { InferActionsTypes, ThunkType } from "./reduxStore";
import { Dispatch } from "redux";

const initialState = {
  chatMessages: [] as [] | Array<ChatMessageType>,
  chatStatus: "connecting" as ChatStatusType,
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
    case "SET_CHAT_STATUS/chatReducer":
      return {
        ...state,
        chatStatus: action.status,
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
  setChatStatus: (status: ChatStatusType) => {
    return {
      type: "SET_CHAT_STATUS/chatReducer",
      status,
    } as const;
  },
};

let _handleNewMessage: ((messages: ChatMessageType[]) => void) | null = null;
const handleNewMessageCreator = (dispatch: Dispatch) => {
  if (_handleNewMessage === null) {
    _handleNewMessage = (messages) => {
      dispatch(actions.setChatMessages(messages));
    };
  }
  return _handleNewMessage;
};

export const startMessagesListening =
  (): ThunkType<chatReducerActionsTypes, void> => (dispatch) => {
    chatAPI.subscribeMessagesCb(handleNewMessageCreator(dispatch));
    chatAPI.subscribeStatusCb((status) => { dispatch(actions.setChatStatus(status)) })
    chatAPI.start();
  };
export const stopMessagesListening =
  (): ThunkType<chatReducerActionsTypes, void> => (dispatch) => {
    chatAPI.unsubscribeMessagesCb(handleNewMessageCreator(dispatch));
    chatAPI.unsubscribeStatusCb((status) => { dispatch(actions.setChatStatus(status)) });
    chatAPI.stop();
  };
export const sendChatMessage =
  (message: string): ThunkType<chatReducerActionsTypes, void> =>
  (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

export type initialStateType = typeof initialState;
type chatReducerActionsTypes = InferActionsTypes<typeof actions>;
