import { CaptchaResultCodes, instance, ResponseType, ResultCodes } from "./api";

export type MeResponse = ResponseType<{
  id: number;
  email: string;
  login: string;
}>;

export type LoginResponse = ResponseType<
  { userId: number },
  ResultCodes | CaptchaResultCodes
>;

export const authAPI = {
  me: async () => {
    const response = await instance.get<MeResponse>("auth/me");
    return response.data;
  },
  login: async (
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) => {
    const response = await instance.post<LoginResponse>("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },
  logout: async () => {
    const response = await instance.delete<ResponseType>("auth/login");
    return response.data;
  },
};
