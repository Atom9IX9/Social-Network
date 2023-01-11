import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "7d610027-af94-4a78-b43f-6e5db6537554" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers: (currentPage, pageSize) => {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollow: (id) => {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
  follow: (id) => {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile: (userId, myProfileId) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    return instance
      .get(`profile/${profileId}`)
      .then((response) => response.data);
  },
  getStatus: (userId, myProfileId) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    return instance
      .get(`profile/status/${profileId}`)
      .then((response) => response.data);
  },
  updateStatus: (status) => {
    return instance
      .put("profile/status", { status: status })
      .then((response) => response.data);
  },
  saveAvatar: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return instance
      .put("/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => response.data);
  },
  saveChangedProfile: (formData) => {
    let {
      fullName,
      lookingForAJobDescription,
      lookingForAJob,
      aboutMe,
      userId,
      contacts
    } = formData;
    return instance
      .put("/profile", {
        userId,
        lookingForAJob,
        lookingForAJobDescription,
        fullName,
        aboutMe,
        contacts,
      })
      .then((response) => response.data);
  },
};

export const authAPI = {
  me: () => {
    return instance.get("auth/me").then((response) => response.data);
  },
  login: (email, password, rememberMe = false) => {
    return instance
      .post("auth/login", { email, password, rememberMe })
      .then((response) => response.data);
  },
  logout: () => {
    return instance.delete("auth/login").then((response) => response.data);
  },
};
