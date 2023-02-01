import { NavLink } from "react-router-dom";
import style from "./User.module.css";
import defaultUserPhoto from "../../../assets/img/defaultUserAv.jpg";
import { PhotosType, UserType } from "../../../types/types";
import * as React from "react";

type UserPhotoProps = {
  photos: PhotosType;
  userId: number;
};
type UserProps = {
  user: UserType;
  isFollowing: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const UserPhoto: React.FC<UserPhotoProps> = ({ photos, userId }) => {
  return (
    <NavLink to={"/profile/" + userId}>
      <img
        src={photos.small != null ? photos.small : defaultUserPhoto}
        className={style.userPhoto}
        alt="user avatar"
      />
    </NavLink>
  );
};

const FollowBtn: React.FC<UserProps> = ({
  user,
  isFollowing,
  unfollow,
  follow,
}) => {
  return (
    <div>
      {user.followed ? (
        <button
          disabled={isFollowing.some((id) => id === user.id)}
          onClick={() => unfollow(user.id)}
          className={[style.unfollowBtn, style.btn].join(" ")}
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={isFollowing.some((id) => id === user.id)}
          onClick={() => follow(user.id)}
          className={[style.followBtn, style.btn].join(" ")}
        >
          Follow
        </button>
      )}
    </div>
  );
};

const User: React.FC<UserProps> = ({ user, unfollow, follow, isFollowing }) => {
  return (
    <div className={style.userContainer}>
      <div className={style.userInfo}>
        <div className={style.nameAndAva}>
          <UserPhoto userId={user.id} photos={user.photos} />
          <div className={style.userName}>{user.name}</div>
        </div>
        <div className={style.info}>
          <div className={style.status}>{user.status}</div>

          <div>{"user.location.city"}</div>
          <div>{"user.location.country"}</div>
        </div>
      </div>
      <FollowBtn
        unfollow={unfollow}
        follow={follow}
        isFollowing={isFollowing}
        user={user}
      />
    </div>
  );
};

export default User;
