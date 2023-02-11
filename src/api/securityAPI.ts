import { instance } from "./api";

export const securityAPI = {
  getCaptcha: async () => {
    const response = await instance.get<CaptchaResponse>("security/get-captcha-url");    
    return response.data;
  },
};

type CaptchaResponse = {
  url: string;
}