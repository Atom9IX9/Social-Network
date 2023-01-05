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

class UsersContainerComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
    //let warnAboutRender = ((line) => console.warn(`In line:${line}. Must be Preloader`))(30)
  }

  onPageChange = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
          // <></>
        ) : (
          <Users
            totalItemsCount={this.props.totalItemsCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            usersArray={this.props.users}
            onPageChange={this.onPageChange}
            isFetching={this.props.isFetching}
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

let mapStateToProps = (state) => {
  return {
    users: getStateUsers(state),
    pageSize: getStatePageSize(state),
    totalItemsCount: getStateTotalUsersCount(state),
    currentPage: getStateCurrentPage(state),
    isFetching: getStateIsFetching(state),
    isFollowing: getStateIsFollowRequest(state),
    ownerId: getMyProfileId(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    getUsers,
    follow,
    unfollow,
  }),
  withAuthRedirect
)(UsersContainerComponent);
