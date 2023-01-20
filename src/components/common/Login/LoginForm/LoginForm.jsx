import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../../../utils/validators";
import { FormInput, createForm } from "../../forms/FormInput";
import style from "./LoginForm.module.css";

const LoginForm = ({ handleSubmit, error, captchaImage }) => (
  <form onSubmit={handleSubmit}>
    <label> 
      <span>Email</span>
      {createForm("email", "Email", [required], FormInput)}</label>
    <label>
      <span>Password</span>
      {createForm("password", "Password", [required], FormInput, "password")}
    </label>

    <label className={style.checkbox}>
      {createForm("rememberMe", null, null, FormInput, "checkbox")}
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
            {createForm("captcha", null, [required], FormInput)}
          </label>
        </div>
      )}
    </div>
    <div>
      <button className={style.loginBtn}>Log in</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
