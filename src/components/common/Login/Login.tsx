import React from "react";
import style from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";
import { login } from "../../../redux/authReducer";
import { Navigate } from "react-router-dom";
import { rootStateType } from "../../../redux/reduxStore";
import { LoginFormDataValues } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";

const Login: React.FC<LoginProps> = () => {
  // * selectors
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  const captchaImage = useSelector(
    (state: rootStateType) => state.auth.captchaImage
  );

  // * hooks
  const dispatch = useDispatch<any>();

  const onSubmit = (formData: LoginFormDataValues) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
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

export default Login;

// * types
type LoginProps = {};
