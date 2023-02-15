import { connect } from "react-redux";
import { getUsers, follow, unfollow, actions } from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {
  getFriendFilter,
  getMyProfileId,
  getStateCurrentPage,
  getStateIsFetching,
  getStateIsFollowRequest,
  getStatePageSize,
  getStateTotalUsersCount,
  getStateUsers,
  getTerm,
} from "../../redux/selectors";
import { UserType } from "../../types/types";
import { rootStateType } from "../../redux/reduxStore";
import style from "./Users.module.css";
const { setFilter } = actions;

class UsersContainerComponent extends React.Component<UsersContainerComponentProps> {
  componentDidMount() {
    this.props.getUsers(
      this.props.currentPage,
      this.props.pageSize,
      this.props.term,
      this.props.friend
    );
  }

  componentDidUpdate(prevProps: Readonly<UsersContainerComponentProps>): void {
    if (prevProps.term !== this.props.term || prevProps.friend !== this.props.friend) {
      this.props.getUsers(
        1,
        this.props.pageSize,
        this.props.term,
        this.props.friend
      );
    }
  }

  onPageChange = (pageNumber: number) => {
    this.props.getUsers(
      pageNumber,
      this.props.pageSize,
      this.props.term,
      this.props.friend
    );
  };

  render() {
    return (
      <>
        <h2 className={style.pageTitle}>Users</h2>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalItemsCount={this.props.totalItemsCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            usersArray={this.props.users}
            onPageChange={this.onPageChange}
            isFollowing={this.props.isFollowing}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            ownerId={this.props.ownerId}
            setFilter={this.props.setFilter}
            getUsers={this.props.getUsers}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state: rootStateType): MapStateToPropsType => {
  return {
    users: getStateUsers(state),
    pageSize: getStatePageSize(state),
    totalItemsCount: getStateTotalUsersCount(state),
    currentPage: getStateCurrentPage(state),
    isFetching: getStateIsFetching(state),
    isFollowing: getStateIsFollowRequest(state),
    ownerId: getMyProfileId(state),
    term: getTerm(state),
    friend: getFriendFilter(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, rootStateType>(
    mapStateToProps,
    {
      getUsers,
      follow,
      unfollow,
      setFilter,
    }
  ),
  withAuthRedirect
)(UsersContainerComponent);

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (
    currentPage: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ) => void;
  setFilter: (term: string, friend: boolean | null) => void;
};
type MapStateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalItemsCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;
  ownerId: number | null;
  term: string;
  friend: boolean | null;
};
type UsersContainerComponentProps = MapStateToPropsType &
  MapDispatchToPropsType;
