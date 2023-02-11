import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  saveAvatar,
  saveChangedProfile,
  saveChangedProfileFormDataType,
} from "../../redux/profileReducer";
import withRouter, { Router } from "../../hoc/withRouter";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getMyProfileId,
  getProfile,
  getProfileStatus,
} from "../../redux/selectors";
import { ProfileType } from "../../types/types";
import { rootStateType } from "../../redux/reduxStore";

class ProfileContainer extends React.Component<ProfileContainerProps> {
  updateProfile = () => {
    this.props.getUserProfile(this.props.router.params.userId);
    this.props.getUserStatus(this.props.router.params.userId);
  };

  componentDidMount = () => {
    this.updateProfile();
  };

  componentDidUpdate = (prevProps: ProfileContainerProps) => {
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
      this.updateProfile();
    }
  };

  render = () => {
    return (
      <Profile
        myProfileId={this.props.myProfileId}
        saveChangedProfile={this.props.saveChangedProfile}
        status={this.props.status}
        profile={this.props.profile}
        updateUserStatus={this.props.updateUserStatus}
        isOwner={!this.props.router.params.userId}
        saveAvatar={this.props.saveAvatar}
      />
    );
  };
}

let mapStateToProps = (state: rootStateType): MapStateToProps => {
  return {
    profile: getProfile(state),
    myProfileId: getMyProfileId(state),
    status: getProfileStatus(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    saveAvatar,
    saveChangedProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

type MapStateToProps = {
  profile: ProfileType | null;
  myProfileId: number | null;
  status: string | null;
};
type MapDispatchToProps = {
  updateUserStatus: (status: string) => void;
  saveChangedProfile: (
    formData: saveChangedProfileFormDataType
  ) => void;
  saveAvatar: (file: File) => void;
  getUserStatus: (userId: number) => void;
  getUserProfile: (userId: number | null) => void;
};
type OwnProps = {
  router: Router<{ userId: number }>;
};
type ProfileContainerProps = OwnProps & MapStateToProps & MapDispatchToProps;
