import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatarImg from "../../assets/img/defaultUserAv.jpg";
import { actions, ChatMessageType } from "../../redux/chatReducer";
import { rootStateType } from "../../redux/reduxStore";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const ChatPage = React.memo(() => {
  return <Chat />;
});

const Chat = React.memo(() => {
  return (
    <div>
      <ChatMessages />
      <AddChatMessageForm />
    </div>
  );
});

const ChatMessages: React.FC<ChatMessagesProps> = React.memo(() => {
  const messages = useSelector(
    (state: rootStateType) => state.chatPage.chatMessages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    ws.addEventListener("message", (e) => {
      debugger;
      const newMessages = JSON.parse(e.data);
      dispatch(actions.setChatMessages(newMessages));
    });
  }, []);

  return (
    <div style={{ overflow: "auto", height: "350px" }}>
      {messages.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  );
});

const AddChatMessageForm = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message) return;
    ws.send(message);
    setMessage("");
  };

  return (
    <>
      <textarea
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      ></textarea>
      <button onClick={sendMessage}>send</button>
    </>
  );
};

const Message: React.FC<MessagePropsType> = ({ message }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Card
        title={message.userName}
        extra={<Avatar size={32} src={message.photo || DefaultAvatarImg} />}
        style={{ width: 500 }}
      >
        <div>{message.message}</div>
      </Card>
    </div>
  );
};

export default React.memo(ChatPage);

type MessagePropsType = {
  message: ChatMessageType;
};
type ChatMessagesProps = {};
