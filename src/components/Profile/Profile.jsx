import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={style.profilePage}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
        saveAvatar={props.saveAvatar}
        saveChangedProfile={props.saveChangedProfile}
        ownerId={props.myProfileId}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
