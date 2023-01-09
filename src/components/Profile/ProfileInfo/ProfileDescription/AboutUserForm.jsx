import React from "react";
import { reduxForm } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../../utils/validators";
import FormInput, { createForm } from "../../../common/forms/FormInput";
import s from "../ProfileInfo.module.css";

const AboutUserForm = (props) => {
  const maxLength20 = maxLengthCreator(20);
  const minLength3 = minLengthCreator(3);

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="userNameForm">User name:</label>
        {createForm(
          "fullName",
          null,
          [required, maxLength20, minLength3],
          "userNameForm",
          FormInput
        )}
      </div>
      <div className={s.lookingForAJob}>
        <label for="LookingForAJobFormId" className={s.LookingForAJob}>
          <span>Looking for a job:</span>
          {createForm(
            "lookingForAJob",
            null,
            null,
            "LookingForAJobFormId",
            FormInput,
            "checkbox"
          )}
        </label>
      </div>
      <div>lookingForAJobDescription</div>
      <div>contacts</div>
      <button className={s.saveBtn}>save</button>
    </form>
  );
};

const AboutUserFormReduxForm = reduxForm({
  form: "aboutUserForm",
})(AboutUserForm);

export default AboutUserFormReduxForm;
