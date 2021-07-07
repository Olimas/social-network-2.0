import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const initialState = {
  userId: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USER_DATA':
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
      payload: {captchaUrl}
    } as const)
}

//* thunkCreator // thunk
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    const {id, email, login} = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (loginData.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message = loginData.messages.length > 0 ? loginData.messages[0] : "some error";
    dispatch(stopSubmit("login", {_error: message}));
  }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}
export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
}

export default authReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
