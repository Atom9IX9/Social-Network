import { useEffect } from "react";
import { useState } from "react";
import s from "../ProfileDescription.module.css";

const UserStatus = ({ status, updateUserStatus, isOwner }) => {
  let [localStateStatus, setStatus] = useState(status);
  let [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  let onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  let toggleEditMode = () => {
    if (isOwner) {
      if (editMode) {
        setEditMode(false);
        updateUserStatus(localStateStatus);
      } else {
        setEditMode(true);
      }
    }
  };

  return (
    <div className={s.status}>
      {!editMode && (
        <div onClick={toggleEditMode}>
          <span>{status || "------"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onChange={onStatusChange}
            onBlur={toggleEditMode}
            value={localStateStatus}
          />
        </div>
      )}
    </div>
  );
};

export default UserStatus
