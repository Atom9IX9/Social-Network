import { connect } from "react-redux";
import { getUsers, follow, unfollow } from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {
  getMyProfileId,
  getStateCurrentPage,
  getStateIsFetching,
  getStateIsFollowRequest,
  getStatePageSize,
  getStateTotalUsersCount,
  getStateUsers,
} from "../../redux/selectors";
import { UserType } from "../../types/types";
import { rootStateType } from "../../redux/reduxStore";
import style from "./Users.module.css"

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
};
type MapStateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalItemsCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;
  ownerId: number | null;
};

type OwnProps = {
  pageTitle: string;
}

type UsersContainerComponentProps = MapStateToPropsType &
  MapDispatchToPropsType & OwnProps;

class UsersContainerComponent extends React.Component<UsersContainerComponentProps> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        <h2 className={style.pageTitle}>{ this.props.pageTitle }</h2>
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
  };
};

export default compose<any>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, rootStateType>(
    mapStateToProps,
    {
      getUsers,
      follow,
      unfollow,
    }
  ),
  withAuthRedirect
)(UsersContainerComponent);
