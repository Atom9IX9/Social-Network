import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "7d610027-af94-4a78-b43f-6e5db6537554" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers: async (currentPage, pageSize) => {
    const response = await instance
      .get(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },
  unfollow: async (id) => {
    const response = await instance.delete(`follow/${id}`);
    return response.data;
  },
  follow: async (id) => {
    const response = await instance.post(`follow/${id}`);
    return response.data;
  },
};

export const profileAPI = {
  getProfile: async (userId, myProfileId) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance
      .get(`profile/${profileId}`);
    return response.data;
  },
  getStatus: async (userId, myProfileId) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance
      .get(`profile/status/${profileId}`);
    return response.data;
  },
  updateStatus: async (status) => {
    const response = await instance
      .put("profile/status", { status: status });
    return response.data;
  },
  saveAvatar: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await instance
      .put("/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    return response.data;
  },
  async saveChangedProfile (formData) {
    let {
      fullName,
      lookingForAJobDescription,
      lookingForAJob,
      aboutMe,
      userId,
      contacts
    } = formData;
    const response = await instance
      .put("/profile", {
        userId,
        lookingForAJob,
        lookingForAJobDescription,
        fullName,
        aboutMe,
        contacts,
      });
    return response.data;
  },
};

export const authAPI = {
  me: async () => {
    const response = await instance.get("auth/me");
    return response.data;
  },
  login: async (email, password, rememberMe = false, captcha) => {
    const response = await instance
      .post("auth/login", { email, password, rememberMe, captcha });
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
  }
}
