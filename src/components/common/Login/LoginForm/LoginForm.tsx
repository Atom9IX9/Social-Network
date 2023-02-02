import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { LoginFormDataValues } from "../../../../types/types";
import { required } from "../../../../utils/validators";
import { FormInput } from "../../forms/FormInput";
import { createForm } from "../../forms/createForm";
import style from "./LoginForm.module.css";

type LoginFormOwnProps = {
  captchaImage: string | null;
};
type LoginFormProps = LoginFormOwnProps &
  InjectedFormProps<LoginFormDataValues, LoginFormOwnProps>;

type LoginFormDataValuesType = keyof LoginFormDataValues;

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  error,
  captchaImage,
}) => (
  <form onSubmit={handleSubmit}>
    <label>
      <span>Email</span>
      {createForm<LoginFormDataValuesType>("email", FormInput, "Email", [
        required,
      ])}
    </label>
    <label>
      <span>Password</span>
      {createForm<LoginFormDataValuesType>(
        "password",
        FormInput,
        "Password",
        [required],
        "password"
      )}
    </label>

    <label className={style.checkbox}>
      {createForm<LoginFormDataValuesType>(
        "rememberMe",
        FormInput,
        undefined,
        [],
        "checkbox"
      )}
      <span>Remember me</span>
    </label>
    <div className={style.loginError}>
      {error && <div className={style.formDataError}>{error}</div>}
    </div>
    <div>
      {captchaImage && (
        <div className={style.captcha}>
          <img src={captchaImage} alt="captcha" />
          <label>
            <div>Anti-bot symbols</div>
            {createForm<LoginFormDataValuesType>(
              "captcha",
              FormInput,
              undefined,
              [required]
            )}
          </label>
        </div>
      )}
    </div>
    <div>
      <button className={style.loginBtn}>Log in</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm<LoginFormDataValues, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
