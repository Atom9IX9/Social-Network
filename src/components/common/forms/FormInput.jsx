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
        className={`${s.input} ${isError ? s.inputValidated : ""}`}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export const createForm = (
  name,
  placeholder,
  validators,
  id,
  component,
  type
) => {
  

  return (
    <FieldInp
      validators={validators}
      placeholder={placeholder}
      name={name}
      id={id}
      component={component}
      type={type}
    />
  );
};

const FieldInp = (props) => {
  return (
    <Field
      validate={props.validators}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      component={props.component}
      type={props.type}
    />
  );
};

export default FormInput;
