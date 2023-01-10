import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDescriptionWithHooks from "./ProfileDescription/ProfileDescriptionWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.header}>
        {/* <img
          src={
            "https://ichef.bbci.co.uk/news/999/cpsprodpb/6D5A/production/_119449972_10.jpg"
          }
          alt="default header"
        /> */}
      </div>
      <ProfileDescriptionWithHooks
        updateUserStatus={props.updateUserStatus}
        profile={props.profile}
        status={props.status}
        isOwner={props.isOwner}
        saveAvatar={props.saveAvatar}
        saveChangedProfile={props.saveChangedProfile}
        ownerId={props.ownerId}
      />
    </div>
  );
};

export default ProfileInfo;
