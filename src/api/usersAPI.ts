import { UserType } from './../types/types';
import { instance, ResponseType } from "./api";

export const usersAPI = {
  getUsers: async (currentPage: number, pageSize: number) => {
    const response = await instance.get<GetUsersResponse>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  unfollow: async (userId: number) => {
    const response = await instance.delete<ResponseType>(`follow/${userId}`);
    return response.data;
  },
  follow: async (userId: number) => {
    const response = await instance.post<ResponseType>(`follow/${userId}`);
    return response.data;
  },
};

type GetUsersResponse = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
}
