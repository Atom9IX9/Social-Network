import React from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

const Users = ({
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
  let users = usersArray.map((u) => {
    if (u.id !== ownerId) {
      return (
        <div className={s.usersPage} key={u.id}>
          <User
            user={u}
            isFollowing={isFollowing}
            unfollow={unfollow}
            follow={follow}
          />
        </div>
      );
    }
  });
  return (
    <>
      <div>{users}</div>
      <div className={s.pagesBar}>
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
