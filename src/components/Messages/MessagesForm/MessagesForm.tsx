import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { MessageFormDataType } from "../../../redux/messagesReducer";
import { createForm } from "../../common/forms/createForm";
import {FormInput} from "../../common/forms/FormControls";
import style from "./MessagesForm.module.css"

const MessagesForm: React.FC<MessagesFormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      {createForm<keyof MessageFormDataType>("newMessage", FormInput, "...new message", [])}
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm<MessageFormDataType>({
  form: "messages",
})(MessagesForm);

export default MessagesReduxForm;

type MessagesFormProps = InjectedFormProps<MessageFormDataType>
