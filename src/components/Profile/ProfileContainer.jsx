import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profileReducer";
import { getAuth } from "../../redux/authReducer";
import withRouter from "../../hoc/withRouter";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getMyProfileId,
  getProfile,
  getProfileStatus,
} from "../../redux/selectors";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    this.props.getUserProfile(
      this.props.router.params.userId,
      this.props.myProfileId
    );
    this.props.getUserStatus(
      this.props.router.params.userId,
      this.props.myProfileId
    );
  };

  render = () => {
    return (
      <Profile
        {...this.props}
        status={this.props.status}
        profile={this.props.profile}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    myProfileId: getMyProfileId(state),
    status: getProfileStatus(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getAuth,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
