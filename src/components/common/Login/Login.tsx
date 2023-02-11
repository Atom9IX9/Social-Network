import React from "react";
import style from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";
import { login } from "../../../redux/authReducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { rootStateType } from "../../../redux/reduxStore";
import { LoginFormDataValues } from "../../../types/types";

const Login: React.FC<LoginProps> = ({ login, isAuth, captchaImage }) => {
  const onSubmit = (formData: LoginFormDataValues) => {
    login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
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

let mapStateToProps = (state: rootStateType) => {
  return { isAuth: state.auth.isAuth, captchaImage: state.auth.captchaImage };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  rootStateType
>(mapStateToProps, { login })(Login);

type MapStateToPropsType = {
  isAuth: boolean;
  captchaImage: string | null;
};
type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
};
type LoginProps = MapStateToPropsType & MapDispatchToPropsType;
