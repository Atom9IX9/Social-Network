import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../../../utils/validators";
import FormInput, { createForm } from "../../forms/FormInput";
import style from "./LoginForm.module.css";

const LoginForm = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="loginInputOfLogin">Login</label>
    {createForm("email", "Email", [required], "loginInputOfLogin", FormInput)}
    <label htmlFor="loginInputOfPassword">Password</label>
    {createForm(
      "password",
      "Password",
      [required],
      "loginInputOfPassword",
      FormInput,
      "password"
    )}

    <label className={style.checkbox}>
      {createForm(
        "rememberMe",
        null,
        null,
        "rememberMe",
        FormInput,
        "checkbox"
      )}
      <span>Remember me</span>
    </label>

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
