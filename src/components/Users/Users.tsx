import React from "react";
import style from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import { UserType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";

const Users: React.FC<UsersProps> = ({
  usersArray,
  isFollowing,
  unfollow,
  follow,
  totalItemsCount,
  pageSize,
  onPageChange,
  currentPage,
  ownerId,
  setFilter,
  getUsers,
}) => {
  let users = usersArray.map((u: UserType) => {
    if (u.id === ownerId) return null;
    return (
      <div className={style.usersPage} key={u.id}>
        <User
          user={u}
          isFollowing={isFollowing}
          unfollow={unfollow}
          follow={follow}
        />
      </div>
    );
  });
  return (
    <div className={style.usersContainer}>
      <div className={style.searchInp}>
        <UsersSearchForm setFilter={setFilter} getUsers={getUsers} />
      </div>
      <div>{users.length ? users : "No users found"}</div>
      <div className={style.pagesBar}>
        <Paginator
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Users;

type UsersProps = {
  usersArray: Array<UserType>;
  isFollowing: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  totalItemsCount: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  setFilter: (term: string, friend: boolean | null) => void;
  currentPage: number;
  ownerId: number | null;
  getUsers: (
    currentPage: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ) => void;
};
