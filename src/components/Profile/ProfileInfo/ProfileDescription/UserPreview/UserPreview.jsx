import React from "react";
import userDefaultPhoto from "../../../../../assets/img/defaultUserAv.jpg";
import s from "../ProfileDescription.module.css";

const UserPreview = ({ fullName, userProfilePhoto, isOwner, saveAvatar }) => {
  let onFileSelected = (e) => {
    if (e.target.files.length) {
      saveAvatar(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={s.fullName}>{fullName}</div>
      <img
        className={s.avatar}
        src={userProfilePhoto ? userProfilePhoto : userDefaultPhoto}
        alt="user avatar"
      />
      {isOwner && <input type="file" onChange={onFileSelected} />}
    </>
  );
};

export default UserPreview;
