import { Field, reduxForm } from "redux-form";
import {FormInput} from "../../common/forms/FormInput";
import s from "./MessagesForm.module.css"

const MessagesForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      <Field name="newMessage" component={FormInput} className={s.field} />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm({
  form: "messages",
})(MessagesForm);

export default MessagesReduxForm;
