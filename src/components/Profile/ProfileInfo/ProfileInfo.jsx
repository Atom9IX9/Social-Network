import Preloader from "../../common/Preloader/Preloader";
import ProfileDescriptionWithHooks from "./ProfileDescription/ProfileDescriptionWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
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
