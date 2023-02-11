import React from "react";
import { ContactType, MessageFormDataType, MessageType } from "../../redux/messagesReducer";
import Contact from "./Contact/Contact";
import Message from "./Message/Message";
import style from "./Messages.module.css";
import MessagesForm from "./MessagesForm/MessagesForm";

const Messages: React.FC<TMessagesProps> = ({contacts, messages, addMessageFromForm}) => {
  let contactElements = contacts.map((c) => (
    <div className={style.contact} key={c.contactId}>
      <Contact contactName={c.name} contactId={c.contactId} />
    </div>
  ));

  let MessageElements = messages.map((m) => (
    <Message
      message={m.message}
      key={m.messageId}
      className={m.isMy ? style.myMessage : style.contactMessage}
    />
  ));

  let onSubmit = (formData: MessageFormDataType) => {
    addMessageFromForm(formData);
  };

  return (
    <div className={style.messagesPage}>
      <div className={style.contacts}>{contactElements}</div>
      <div className={style.messagesItems}>
        <div className={style.messagesElements}>{MessageElements}</div>
        <MessagesForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Messages;

type TMessagesProps = {
  contacts: Array<ContactType>;
  messages: Array<MessageType>;
  addMessageFromForm: (formData: MessageFormDataType) => void
}
