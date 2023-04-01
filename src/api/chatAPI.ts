let ws: WebSocket | null = null;

let subscribers: SubscribersType = {
  messagesSubscribers: [],
  statusSubscribers: [],
};

const createWSChannel = () => {
  ws?.close();
  cleanAllListeners();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  ws.addEventListener("message", handleMessage);
  ws.addEventListener("error", handleError);
  ws.addEventListener("close", handleClose);
  ws.addEventListener("open", handleOpen);
};

//? handlers
const handleClose = () => {
  setTimeout(createWSChannel, 3000);
  subscribers.statusSubscribers.forEach((s) => {
    s("connecting");
  });
};
const handleError = () => {
  ws?.close();
};
const handleMessage = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.messagesSubscribers.forEach((s) => s(newMessages));
};
const handleOpen = () => {
  subscribers.statusSubscribers.forEach((s) => {
    s("ready");
  });
};

const cleanAllListeners = () => {
  ws?.removeEventListener("close", handleClose);
  ws?.removeEventListener("message", handleMessage);
  ws?.removeEventListener("error", handleError);
  ws?.removeEventListener("open", handleOpen);
};

//? All ChatAPI Methods
export const chatAPI = {
  start: () => {
    createWSChannel();
  },
  stop: () => {
    cleanAllListeners();
    ws?.close();

    subscribers.statusSubscribers = [];
    subscribers.messagesSubscribers = [];
  },
  subscribeMessagesCb: (subscriber: MessagesSubscriberType) => {
    subscribers.messagesSubscribers.push(subscriber as never);
  },
  unsubscribeMessagesCb: (subscriber: MessagesSubscriberType) => {
    subscribers.messagesSubscribers.filter((s) => s !== subscriber);
  },
  subscribeStatusCb: (subscriber: StatusSubscriberType) => {
    subscribers.statusSubscribers.push(subscriber as never);
  },
  unsubscribeStatusCb: (subscriber: StatusSubscriberType) => {
    subscribers.statusSubscribers.filter((s) => s !== subscriber);
  },
  sendMessage: (message: string) => {
    ws?.send(message);
  },
};

export type ChatMessageType = {
  message: string;
  userId: number;
  userName: string;
  photo: string | null;
};
type MessagesSubscriberType = (messages: ChatMessageType[]) => void;
type StatusSubscriberType = (status: ChatStatusType) => void;
type SubscribersType = {
  messagesSubscribers: MessagesSubscriberType[] | [];
  statusSubscribers: StatusSubscriberType[] | [];
};
export type ChatStatusType = "ready" | "connecting";
