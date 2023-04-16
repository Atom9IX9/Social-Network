import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/usersReducer";
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
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const UsersPage: React.FC<UsersPageProps> = () => {
  // * selectors
  const isFetching = useSelector(getStateIsFetching);
  const pageSize = useSelector(getStatePageSize);
  const filterTerm = useSelector(getTerm);
  const filterFriend = useSelector(getFriendFilter);
  const currentPage = useSelector(getStateCurrentPage);

  // * hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  // * initial query in url address
  useEffect(() => {
    let { friend, term, page } = queryString.parse(location.search);

    let actualPage = currentPage;
    let actualTerm = filterTerm;
    let actualFriend = filterFriend;
    if (page) actualPage = +page;
    if (term) actualTerm = term as string;
    if (friend)
      actualFriend =
        friend === "false" ? false : friend === "true" ? true : null;

    dispatch(getUsers(actualPage, pageSize, actualTerm, actualFriend));
  }, []);

  // * updating query in url address
  useEffect(() => {
    const query: any = {};

    if (!!filterTerm) query.term = filterTerm;
    if (filterFriend !== null) query.friend = String(filterFriend);
    if (!!currentPage) query.page = String(currentPage);

    navigate("?" + queryString.stringify(query));
  }, [filterTerm, filterFriend, currentPage]);

  return (
    <>
      <h2 className={style.pageTitle}>Users</h2>
      {isFetching ? <Preloader /> : <Users />}
    </>
  );
};

const MemoizedUsersPage = React.memo(
  compose<React.ComponentType>(withAuthRedirect)(UsersPage)
);

export default MemoizedUsersPage;

type UsersPageProps = {};
