import { saveChangedProfileFormDataType } from "../../../redux/profileReducer";
import { ProfileType } from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDescriptionWithHooks from "./ProfileDescription/ProfileDescriptionWithHooks";

type TProfileInfoProps = {
  profile: ProfileType | null;
  updateUserStatus: (status: string) => void;
  status: string | null;
  isOwner: boolean;
  saveAvatar: (file: File) => void;
  saveChangedProfile: (formData: saveChangedProfileFormDataType) => void;
  ownerId: number | null;
};

const ProfileInfo: React.FC<TProfileInfoProps> = ({
  profile,
  updateUserStatus,
  status,
  isOwner,
  saveAvatar,
  saveChangedProfile,
  ownerId,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <ProfileDescriptionWithHooks
        updateUserStatus={updateUserStatus}
        profile={profile}
        status={status}
        isOwner={isOwner}
        saveAvatar={saveAvatar}
        saveChangedProfile={saveChangedProfile}
        ownerId={ownerId}
      />
    </div>
  );
};

export default ProfileInfo;
