import { ProfileType } from "./../types/types";
import axios from "axios";

export enum ResultCodes {
  Success = 0,
  Error = 1,
}
export enum CaptchaResultCodes {
  CaptchaIsRequired = 10
}

const instance = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "7d610027-af94-4a78-b43f-6e5db6537554" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers: async (currentPage: number, pageSize: number) => {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  unfollow: async (userId: number) => {
    const response = await instance.delete(`follow/${userId}`);
    return response.data;
  },
  follow: async (userId: number) => {
    const response = await instance.post(`follow/${userId}`);
    return response.data;
  },
};

export const profileAPI = {
  getProfile: async (userId: number | null, myProfileId: number) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance.get(`profile/${profileId}`);
    return response.data;
  },
  getStatus: async (userId: number, myProfileId: number) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance.get(`profile/status/${profileId}`);
    return response.data;
  },
  updateStatus: async (status: string) => {
    const response = await instance.put("profile/status", { status: status });
    return response.data;
  },
  saveAvatar: async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await instance.put("/profile/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  async saveChangedProfile(formData: ProfileType) {
    let {
      fullName,
      lookingForAJobDescription,
      lookingForAJob,
      //aboutMe, //! should add
      userId,
      contacts,
    } = formData;
    const response = await instance.put("/profile", {
      userId,
      lookingForAJob,
      lookingForAJobDescription,
      fullName,
      //aboutMe, //! should add
      contacts,
    });
    return response.data;
  },
};

type MeResponse = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodes;
  messages: Array<string>;
};

type LoginResponse = {
  data: {
    userId: number
  };
  resultCode: ResultCodes | CaptchaResultCodes;
  messages: Array<string>;
};

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
    const response = await instance.delete("auth/login");
    return response.data;
  },
};

export const securityAPI = {
  getCaptcha: async () => {
    const response = await instance.get("security/get-captcha-url");
    return response.data;
  },
};

//authAPI.me().then(response => response)
