import style from "./FormInput.module.css";

const FormControl = ({ isError, errorMessage, id, children }) => {
  return (
    <div>
      <div>
        <label htmlFor={id} className={style.errorText}>
          {isError ? errorMessage : ""}
        </label>
      </div>
      {children}
    </div>
  );
};

export const FormInput = ({
  input,
  meta: { active, touched, error },
  ...props
}) => {
  const isError = !active && touched && error;
  console.log(isError, error);
  return (
    <FormControl id={props.id} errorMessage={error} isError={isError}>
      <input
        {...input}
        {...props}
        className={`${style.input} ${isError ? style.inputValidated : ""}`}
        placeholder={props.placeholder}
      />
    </FormControl>
  );
};

export const FormTextarea = ({
  input,
  meta: { active, touched, error },
  ...props
}) => {
  const isError = !active && touched && error;
  return (
    <FormControl id={props.id} errorMessage={error} isError={isError}>
      <textarea
        {...input}
        {...props}
        className={isError ? style.inputValidated : ""}
        placeholder={props.placeholder}
      />
    </FormControl>
  );
};
