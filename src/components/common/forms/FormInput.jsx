import React from "react";
import { Field } from "redux-form";
import s from "./FormInput.module.css";

const FormInput = ({ input, meta, ...props }) => {
  const isError = !meta.active && meta.touched && meta.error;
  return (
    <div>
      <div>
        <label htmlFor={props.id} className={s.errorText}>
          {isError ? meta.error : ""}
        </label>
      </div>
      <input
        {...input}
        {...props}
        className={isError ? s.inputValidated : s.input}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export const createForm = (name, placeholder, labelText, validators, id, component, type) => {
  return (
    <div>
      <Field
        validate={validators}
        placeholder={placeholder}
        name={name}
        id={id}
        component={component}
        type={type}
      />
    </div>
  );
};

export default FormInput;
