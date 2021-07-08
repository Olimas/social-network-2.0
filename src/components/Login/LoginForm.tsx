import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/formsControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import styles from "../common/formsControls/FormControls.module.css";

export type LoginFormValuesType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}
export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const maxLength50 = maxLengthCreator(50);
type LoginFormOwnProps = {
  captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
  ({handleSubmit, error, captchaUrl}) => {
    return (
      <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>("Email", "email", [required, maxLength50], Input, {})}
        {createField<LoginFormValuesTypeKeys>("Password", "password", [required, maxLength50], Input, {type: "password"})}
        {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

        {error &&
        <div className={styles.formSummaryError}>
          {error}
        </div>
        }
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)
