import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chatAPI";
import DefaultAvatarImg from "../../assets/img/defaultUserAv.jpg";
import {
  sendChatMessage,
  startMessagesListening,
} from "../../redux/chatReducer";
import { rootStateType } from "../../redux/reduxStore";

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
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(startMessagesListening());
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
  const chatStatus = useSelector(
    (state: rootStateType) => state.chatPage.chatStatus
  );
  const dispatch = useDispatch<any>();

  const sendMessage = () => {
    if (message) {
      dispatch(sendChatMessage(message));
      setMessage("");
    } else return;
  };

  return (
    <>
      <textarea
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      ></textarea>
      <button
        disabled={chatStatus === "ready" ? false : true}
        onClick={sendMessage}
      >
        send
      </button>
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
