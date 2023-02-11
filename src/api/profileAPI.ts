import { PhotosType, ProfileType } from "./../types/types";
import { instance, ResponseType } from "./api";

export const profileAPI = {
  getProfile: async (userId: number | null, myProfileId: number) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance.get<ProfileType>(`profile/${profileId}`);
    return response.data;
  },
  getStatus: async (userId: number, myProfileId: number) => {
    let profileId = userId;
    if (!profileId) {
      profileId = myProfileId;
    }
    const response = await instance.get<string>(`profile/status/${profileId}`);
    return response.data;
  },
  updateStatus: async (status: string) => {
    const response = await instance.put("profile/status", { status: status });
    return response.data;
  },
  saveAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await instance.put<SaveAvatarResponse>(
      "/profile/photo",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
  async saveChangedProfile(formData: ProfileType) {
    const response = await instance.put<ResponseType>("/profile", formData);
    return response.data;
  },
};

type SaveAvatarResponse = ResponseType<{ photos: PhotosType }>;
