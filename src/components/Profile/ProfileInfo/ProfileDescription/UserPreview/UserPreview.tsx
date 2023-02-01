import React from "react";
import userDefaultPhoto from "../../../../../assets/img/defaultUserAv.jpg";
import style from "../ProfileDescription.module.css";

type UserPreviewProps = {
  fullName: string;
  userProfilePhoto: string | null;
  isOwner: boolean;
  saveAvatar: (file: any) => void;
};

const UserPreview: React.FC<UserPreviewProps> = ({
  fullName,
  userProfilePhoto,
  isOwner,
  saveAvatar,
}) => {
  let onFileSelected = (e: any) => {
    if (e.target.files.length) {
      saveAvatar(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={style.fullName}>{fullName}</div>
      <img
        className={style.avatar}
        src={userProfilePhoto ? userProfilePhoto : userDefaultPhoto}
        alt="user avatar"
      />
      {isOwner && (
        <div>
          <input type="file" onChange={onFileSelected} />
        </div>
      )}
    </>
  );
};

export default UserPreview;
