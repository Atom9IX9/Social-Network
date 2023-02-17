import { useDispatch, useSelector } from "react-redux";
import { getUsers, actions } from "../../redux/usersReducer";
import React, { useEffect } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {
  getFriendFilter,
  getStateCurrentPage,
  getStateIsFetching,
  getStatePageSize,
  getTerm,
} from "../../redux/selectors";
import style from "./Users.module.css";
const { setFilter } = actions;

const UsersPage: React.FC<UsersPageProps> = () => {
  const isFetching = useSelector(getStateIsFetching);
  const currentPage = useSelector(getStateCurrentPage);
  const pageSize = useSelector(getStatePageSize);
  const term = useSelector(getTerm);
  const friend = useSelector(getFriendFilter);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, term, friend));
  }, [term, friend]);
  return (
    <>
      <h2 className={style.pageTitle}>Users</h2>
      {isFetching ? (
        <Preloader />
      ) : (
        <Users
          isFetching={isFetching}
          setFilter={setFilter} //
        />
      )}
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(UsersPage);

type UsersPageProps = {};
