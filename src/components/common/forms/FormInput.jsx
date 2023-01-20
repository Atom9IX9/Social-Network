import React from "react";
import { Field } from "redux-form";
import s from "./FormInput.module.css";

export const FormInput = ({ input, meta, ...props }) => {
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

export const FormTextarea = ({ input, meta, ...props }) => {
  const isError = !meta.active && meta.touched && meta.error;

  return (
    <div>
      <div>
        <label htmlFor={props.id} className={s.errorText}>
          {isError ? meta.error : ""}
        </label>
      </div>
      {/* <input
        {...input}
        {...props}
        className={`${s.input} ${isError ? s.inputValidated : ""}`}
        placeholder={props.placeholder}
      /> */}
      <textarea
        {...input}
        {...props}
        className={isError ? s.inputValidated : ""}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export const createForm = (
  name,
  placeholder,
  validators,
  component,
  type
) => {
  return (
    <Field
      validate={validators}
      placeholder={placeholder}
      name={name}
      component={component}
      type={type}
    />
  );
};