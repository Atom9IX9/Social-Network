import axios from "axios";

export type ResponseType<D = {}, RC = ResultCodes> = {
  data: D;
  messages: Array<string>;
  resultCode: RC
}

export enum ResultCodes {
  Success = 0,
  Error = 1,
}
export enum CaptchaResultCodes {
  CaptchaIsRequired = 10,
}

export const instance = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "7d610027-af94-4a78-b43f-6e5db6537554" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});
