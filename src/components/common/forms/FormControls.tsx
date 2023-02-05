import style from "./FormInput.module.css";
import { WrappedFieldProps } from "redux-form";

type TFormControlProps = {
  isError: boolean;
  errorMessage: string | undefined;
  children: JSX.Element;
};
export type TFormProps = {
  placeholder: string | undefined;
  type: string | undefined;
} & WrappedFieldProps;

const FormControl: React.FC<TFormControlProps> = ({
  isError,
  errorMessage,
  children,
}) => {
  return (
    <div>
      <div>
        <label className={style.errorText}>{isError ? errorMessage : ""}</label>
      </div>
      {children}
    </div>
  );
};

export const FormInput: React.FC<TFormProps> = ({
  input,
  meta: { active, touched, error },
  placeholder,
  type,
}) => {
  const isError = !active && touched && error;
  return (
    <FormControl errorMessage={error} isError={isError}>
      <input
        {...input}
        className={`${style.input} ${isError ? style.inputValidated : ""}`}
        placeholder={placeholder}
        type={type}
      />
    </FormControl>
  );
};

export const FormTextarea: React.FC<TFormProps> = ({
  input,
  meta: { active, touched, error },
  placeholder,
}) => {
  const isError = !active && touched && error;
  return (
    <FormControl errorMessage={error} isError={isError}>
      <textarea
        {...input}
        className={isError ? style.inputValidated : ""}
        placeholder={placeholder}
      />
    </FormControl>
  );
};



