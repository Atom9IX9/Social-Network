import React from "react";
import style from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";
import { login } from "../../../redux/authReducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = ({login, isAuth}) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginWrap}>
        <h1>Liogin</h1>
        <LoginReduxForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, { login })(Login);
