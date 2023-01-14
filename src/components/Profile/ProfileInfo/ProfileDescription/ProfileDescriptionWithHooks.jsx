import React from "react";
import s from "./ProfileDescription.module.css";
import AboutUser from "./AboutUser/AboutUser";
import UserPreview from "./UserPreview/UserPreview";
import UserStatus from "./UserStatus/UserStatus";
import { useState } from "react";
import AboutUserForm from "./AboutUserForm";

const ProfileDescriptionWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    if (editMode) setEditMode(false);
    else setEditMode(true);
  };

  const onSubmit = (FormData) => {
    props
      .saveChangedProfile({ ...FormData, userId: props.ownerId })
      .then(() => toggleEditMode());
  };

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

      {editMode ? (
        <AboutUserForm
          onSubmit={onSubmit}
          profile={props.profile}
          initialValues={props.profile}
        />
      ) : (
        <AboutUser
          profile={props.profile}
          toggleEditMode={toggleEditMode}
          isOwner={props.isOwner}
        />
      )}
    </div>
  );
};

export default ProfileDescriptionWithHooks;
