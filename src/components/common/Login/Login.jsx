import React from "react";
import style from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";
import { login } from "../../../redux/authReducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = ({login, isAuth, captchaImage}) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginWrap}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaImage={captchaImage} />
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth, captchaImage: state.auth.captchaImage };
};

export default connect(mapStateToProps, { login })(Login);
