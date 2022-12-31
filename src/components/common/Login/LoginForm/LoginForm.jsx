import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../../../utils/validators";
import FormInput, { createForm } from "../../forms/FormInput";
import style from "./LoginForm.module.css";

const LoginForm = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="loginInputOfLogin">Login</label>
    {createForm(
      "email",
      "Email",
      "Email",
      [required],
      "loginInputOfLogin",
      FormInput
    )}
    <label htmlFor="loginInputOfPassword">Password</label>
    {createForm(
      "password",
      "Password",
      "Password",
      [required],
      "loginInputOfPassword",
      FormInput,
      "password"
    )}
    <div className={style.checkbox}>
    <div className={style.box}>
        {createForm(
          "rememberMe",
          null,
          "Remember me",
          null,
          "rememberMe",
          "input",
          "checkbox"
        )}
      </div>
      <label htmlFor="rememberMe">Remember me</label>
    </div>
    {error && <div className={style.formDataError}>{error}</div>}
    <div>
      <button className={style.loginBtn}>Log in</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
