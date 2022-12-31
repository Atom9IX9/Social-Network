import React from "react";
import s from "./ProfileDescription.module.css";
import userPhoto from "../../../../assets/img/2e2e2125ee53807c2d77b34773f84b5c.jpg";

class ProfileDescription extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleEditMode = () => {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
      });
      this.props.updateUserStatus(this.state.status);
    } else if (!this.state.editMode) {
      this.setState({
        editMode: true,
      });
    }
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div className={s.description}>
        <div className={s.fullName}>{this.props.profile.fullName}</div>
        <img
          className={s.avatar}
          src={
            this.props.profile.photos.large
              ? this.props.profile.photos.large
              : userPhoto
          }
          alt="user avatar"
        />
        <div className={s.status}>
          {!this.state.editMode && (
            <div onClick={this.toggleEditMode}>
              <span>{this.props.status || "------"}</span>
            </div>
          )}
          {this.state.editMode && (
            <div onBlur={this.toggleEditMode}>
              <input
                onChange={this.onStatusChange}
                autoFocus={true}
                type="text"
                value={this.state.status}
              />
            </div>
          )}
        </div>
        <div className={s.aboutMe}>{this.props.profile.aboutMe}</div>
        <h5>About Job</h5>
        <div className={s.lookingForAJob}>
          Need work: {this.props.profile.lookingForAJob ? "Yes" : "No"}{" "}
        </div>
        <div className={s.workDescription}>
          {this.props.profile.lookingForAJobDescription}{" "}
        </div>
      </div>
    );
  }
}

export default ProfileDescription;
