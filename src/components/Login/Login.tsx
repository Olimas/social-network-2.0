import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {LoginFormValuesType, LoginReduxForm} from "./LoginForm";
import {login} from "../../redux/auth-reducer";

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = async (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }
  if (isAuth) {
    return <Redirect to={"/profile"}/>
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}
