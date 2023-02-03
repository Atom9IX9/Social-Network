import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../../utils/validators";
import { FormInput, FormTextarea } from "../../../common/forms/FormInput";
import { createForm } from "../../../common/forms/createForm";
import style from "../ProfileInfo.module.css";
import { ContactsType, ProfileType } from "../../../../types/types";

type TOwnProps = {
  profile: ProfileType;
  toggleEditMode: () => void;
}

type TAboutUserFormProps = InjectedFormProps<TAboutUserFormData, TOwnProps> & TOwnProps

const AboutUserForm: React.FC<TAboutUserFormProps> = (props) => {  
  const maxLength20 = maxLengthCreator(20);
  const minLength3 = minLengthCreator(3);
  let contactInputs = Object.keys(props.profile.contacts)
    .map((key) => {
      return (
        <div key={key} className={style.contact}>
          <label>
            <span className={style.labelText}>{key}</span>
            {createForm(`contacts.${key}`, FormInput, key, [])}
          </label>
        </div>
      );
    })
    .filter((c) => c !== null);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>User name</span>
          {createForm("fullName", FormInput, undefined, [
            required,
            maxLength20,
            minLength3,
          ])}
        </label>
      </div>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>About me</span>
          {createForm("aboutMe", FormTextarea, undefined, [required])}
        </label>
      </div>
      <div className={style.formInp}>
        <label className={style.LookingForAJob}>
          <span className={style.labelText}>Looking for a job</span>
          {createForm("lookingForAJob", FormInput, undefined, [], "checkbox")}
        </label>
      </div>
      <div className={style.formInp}>
        <label>
          <span className={style.labelText}>Job description</span>
          <br />
          {createForm("lookingForAJobDescription", FormTextarea, undefined, [
            required,
          ])}
        </label>
      </div>
      <div className={style.contacts}>{contactInputs}</div>
      <button
        className={style.saveBtn}
        onClick={!props.error ? props.toggleEditMode : () => {}}
      >
        save
      </button>
    </form>
  );
};

type TAboutUserFormData = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
}

const AboutUserFormReduxForm = reduxForm<TAboutUserFormData, TOwnProps>({
  form: "aboutUserForm",
  enableReinitialize: true,
})(AboutUserForm);

export default AboutUserFormReduxForm;
