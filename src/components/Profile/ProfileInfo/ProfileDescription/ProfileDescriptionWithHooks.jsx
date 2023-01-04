import React from "react";
import s from "./ProfileDescription.module.css";
import userPhoto from "../../../../assets/img/defaultUserAv.jpg";
import { useState } from "react";
import { useEffect } from "react";

const ProfileDescriptionWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  let toggleEditMode = () => {
    if (props.isOwner) {
      if (editMode) {
        setEditMode(false);
        props.updateUserStatus(status);
      } else {
        setEditMode(true);
      }
    }
  };

  let onFileSelected = (e) => {
    if (e.target.files.length) {
      props.saveAvatar(e.target.files[0])
    }
  };

  let onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.description}>
      <div className={s.fullName}>{props.profile.fullName}</div>
      <img
        className={s.avatar}
        src={
          props.profile.photos.large ? props.profile.photos.large : userPhoto
        }
        alt="user avatar"
      />
      {props.isOwner && <input type="file" onChange={onFileSelected} />}
      <div className={s.status}>
        {!editMode && (
          <div onClick={toggleEditMode}>
            <span>{props.status || "------"}</span>
          </div>
        )}
        {editMode && (
          <div>
            <input
              autoFocus={true}
              onChange={onStatusChange}
              onBlur={toggleEditMode}
              value={status}
            />
          </div>
        )}
      </div>
      <div className={s.aboutMe}>{props.profile.aboutMe}</div>
      <h5>About Job</h5>
      <div className={s.lookingForAJob}>
        Need work: {props.profile.lookingForAJob ? "Yes" : "No"}{" "}
      </div>
      <div className={s.workDescription}>
        {props.profile.lookingForAJobDescription}{" "}
      </div>
    </div>
  );
};

export default ProfileDescriptionWithHooks;
