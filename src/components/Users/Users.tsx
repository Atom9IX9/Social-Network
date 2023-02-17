import React from "react";
import style from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import { UserType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendFilter,
  getMyProfileId,
  getStateCurrentPage,
  getStateIsFollowRequest,
  getStatePageSize,
  getStateTotalUsersCount,
  getStateUsers,
  getTerm,
} from "../../redux/selectors";
import { getUsers, follow, unfollow } from "../../redux/usersReducer";

const Users: React.FC<UsersProps> = () => {
  const currentPage = useSelector(getStateCurrentPage);
  const totalItemsCount = useSelector(getStateTotalUsersCount);
  const pageSize = useSelector(getStatePageSize);
  const term = useSelector(getTerm);
  const friend = useSelector(getFriendFilter);
  const isFollowing = useSelector(getStateIsFollowRequest);
  const usersArray = useSelector(getStateUsers);
  const ownerId = useSelector(getMyProfileId);

  const dispatch = useDispatch<any>();

  const onPageChange = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, term, friend));
  };
  const dispatchFollow = (userId: number) => {
    dispatch(follow(userId));
  };
  const dispatchUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  const users = usersArray.map((u: UserType) => {
    if (u.id === ownerId) return null;
    return (
      <div className={style.usersPage} key={u.id}>
        <User
          user={u}
          isFollowing={isFollowing}
          unfollow={dispatchUnfollow}
          follow={dispatchFollow}
        />
      </div>
    );
  });
  return (
    <div className={style.usersContainer}>
      <div className={style.searchInp}>
        <UsersSearchForm getUsers={getUsers} />
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

type UsersProps = {};
