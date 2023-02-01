import React from "react";
import style from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import { UserType } from "../../types/types";

type UsersProps = {
  usersArray: Array<UserType>;
  isFollowing: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  totalItemsCount: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  ownerId: number | null;
};


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
    <>
      <div>{users}</div>
      <div className={style.pagesBar}>
        <Paginator
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Users;
