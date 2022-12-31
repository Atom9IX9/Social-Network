import React from "react";
import Contact from "./Contact/Contact";
import Message from "./Message/Message";
import style from "./Messages.module.css";
import MessagesForm from "./MessagesForm/MessagesForm";

const Messages = (props) => {
  let contactElements = props.contacts.map((c) => (
    <div className={style.contact} key={c.contactId}>
      <Contact name={c.name} contactId={c.contactId} />
    </div>
  ));

  let MessageElements = props.messages.map((m) => (
    <Message
      message={m.message}
      key={m.messageId}
      className={m.isMy ? style.myMessage : style.contactMessage}
    />
  ));

  let onSubmit = (formData) => {
    props.addMessageFromForm(formData);
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
