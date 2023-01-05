import React from "react";
import s from "./ProfileDescription.module.css";
import AboutUser from "./AboutUser/AboutUser";
import UserPreview from "./UserPreview/UserPreview";
import UserStatus from "./UserStatus/UserStatus";

const ProfileDescriptionWithHooks = (props) => {
  return (
    <div className={s.description}>
      <UserPreview
        fullName={props.profile.fullName}
        userProfilePhoto={props.profile.photos.large}
        isOwner={props.isOwner}
        saveAvatar={props.saveAvatar}
      />

      <UserStatus
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
      />

      <AboutUser profile={props.profile} />
    </div>
  );
};

export default ProfileDescriptionWithHooks;
