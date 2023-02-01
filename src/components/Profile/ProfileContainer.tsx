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
  ThunkType,
} from "../../redux/profileReducer";
import withRouter from "../../hoc/withRouter";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getMyProfileId,
  getProfile,
  getProfileStatus,
} from "../../redux/selectors";
import { ProfileType } from "../../types/types";
import { rootStateType } from "../../redux/reduxStore";

type MapStateToProps = {
  profile: ProfileType | null;
  myProfileId: number | null;
  status: string | null;
};
type MapDispatchToProps = {
  updateUserStatus: (status: string) => ThunkType;
  saveChangedProfile: (formData: saveChangedProfileFormDataType) => ThunkType;
  saveAvatar: (file: any) => ThunkType;
  getUserStatus: (userId: number, myProfileId?: number | null) => ThunkType;
  getUserProfile: (userId: number, myProfileId?: number | null) => ThunkType;
};
type OwnProps = {
  router: any;
};
type ProfileContainerProps = OwnProps & MapStateToProps & MapDispatchToProps;

class ProfileContainer extends React.Component<ProfileContainerProps> {
  updateProfile = () => {
    this.props.getUserProfile(
      this.props.router.params.userId,
      this.props.myProfileId
    );
    this.props.getUserStatus(
      this.props.router.params.userId,
      this.props.myProfileId
    );
  };

  componentDidMount = () => {
    this.updateProfile();
  };

  componentDidUpdate = (prevProps: any, prevState: any) => {
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

export default compose(
  connect(
    mapStateToProps,
    {
      getUserProfile,
      getUserStatus,
      updateUserStatus,
      saveAvatar,
      saveChangedProfile,
    }
  ),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
