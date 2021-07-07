import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "b4504d53-a904-47b8-aa6a-132143962710",
  }
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
//* Create generic type
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
