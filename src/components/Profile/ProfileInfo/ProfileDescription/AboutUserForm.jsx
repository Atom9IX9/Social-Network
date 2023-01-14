import React from "react";
import { reduxForm } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../../utils/validators";
import {
  FormInput,
  FormTextarea,
  createForm,
} from "../../../common/forms/FormInput";
import s from "../ProfileInfo.module.css";

const AboutUserForm = (props) => {
  const maxLength20 = maxLengthCreator(20);
  const minLength3 = minLengthCreator(3);
  let contactInputs = Object.keys(props.profile.contacts)
    .map((key) => {
      return (
        <div key={key} className={s.contact}>
          <span className={s.linkName}>{key}</span>
          {createForm(`contacts.${key}`, key, null, key, FormInput)}
        </div>
      );
    })
    .filter((c) => c !== null);

    return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.formInp}>
        <label htmlFor="userNameForm">
          <span className={s.labelText}>User name</span>
        </label>
        {createForm(
          "fullName",
          null,
          [required, maxLength20, minLength3],
          "userNameForm",
          FormInput
        )}
      </div>
      <div className={s.formInp}>
        <label>
          <span className={s.labelText}>About me</span>
          {createForm("aboutMe", null, [required], "aboutMeId", FormTextarea)}
        </label>
      </div>
      <div className={s.formInp}>
        <label htmlFor="LookingForAJobFormId" className={s.LookingForAJob}>
          <span className={s.labelText}>Looking for a job</span>
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
      <div className={s.formInp}>
        <label>
          <span className={s.labelText}>Skills</span>
          <br />
          {createForm(
            "lookingForAJobDescription",
            null,
            [required],
            "lookingForAJobDescriptionId",
            FormTextarea
          )}
        </label>
      </div>
      <div className={s.contacts}>{contactInputs}</div>
      <button className={s.saveBtn} onClick={props.error || props.toggleEditMode}>save</button>
    </form>
  );
};

const AboutUserFormReduxForm = reduxForm({
  form: "aboutUserForm",
  enableReinitialize: true,
})(AboutUserForm);

export default AboutUserFormReduxForm;
