import { NavLink } from "react-router-dom";
import style from "./User.module.css";
import defaultUserPhoto from "../../../assets/img/defaultUserAv.jpg";

const UserPhoto = ({ photos, userId }) => {
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

const FollowBtn = ({ user, isFollowing, unfollow, follow }) => {
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

const User = ({ user, unfollow, follow, isFollowing }) => {
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
