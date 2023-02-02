import React from "react";
import style from "./FormInput.module.css";

export const FormInput = ({
  input,
  meta: { active, touched, error },
  ...props
}) => {
  const isError = !active && touched && error;
  return (
    <div>
      <div>
        <label htmlFor={props.id} className={style.errorText}>
          {isError ? error : ""}
        </label>
      </div>
      <input
        {...input}
        {...props}
        className={`${style.input} ${isError ? style.inputValidated : ""}`}
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
        <label htmlFor={props.id} className={style.errorText}>
          {isError ? meta.error : ""}
        </label>
      </div>
      <textarea
        {...input}
        {...props}
        className={isError ? style.inputValidated : ""}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};


