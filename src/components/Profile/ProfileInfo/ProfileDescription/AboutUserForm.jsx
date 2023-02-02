import React from "react";
import { reduxForm } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../../utils/validators";
import { FormInput, FormTextarea } from "../../../common/forms/FormInput";
import { createForm } from "../../../common/forms/createForm";
import style from "../ProfileInfo.module.css";

const AboutUserForm = (props) => {
  const maxLength20 = maxLengthCreator(20);
  const minLength3 = minLengthCreator(3);
  let contactInputs = Object.keys(props.profile.contacts)
    .map((key) => {
      return (
        <div key={key} className={style.contact}>
          <span className={style.linkName}>{key}</span>
          {createForm(`contacts.${key}`, FormInput, key, null)}
        </div>
      );
    })
    .filter((c) => c !== null);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>User name</span>
          {createForm("fullName", FormInput, null, [
            required,
            maxLength20,
            minLength3,
          ])}
        </label>
      </div>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>About me</span>
          {createForm("aboutMe", FormTextarea, null, [required])}
        </label>
      </div>
      <div className={style.formInp}>
        <label className={style.LookingForAJob}>
          <span className={style.labelText}>Looking for a job</span>
          {createForm("lookingForAJob", FormInput, null, null, "checkbox")}
        </label>
      </div>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>Skills</span>
          <br />
          {createForm("lookingForAJobDescription", FormTextarea, null, [
            required,
          ])}
        </label>
      </div>
      <div className={style.contacts}>{contactInputs}</div>
      <button
        className={style.saveBtn}
        onClick={props.error || props.toggleEditMode}
      >
        save
      </button>
    </form>
  );
};

const AboutUserFormReduxForm = reduxForm({
  form: "aboutUserForm",
  enableReinitialize: true,
})(AboutUserForm);

export default AboutUserFormReduxForm;
