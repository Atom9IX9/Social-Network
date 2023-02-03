import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import * as React from 'react';
import { ProfileType } from "../../types/types";
import { saveChangedProfileFormDataType } from "../../redux/profileReducer";

type ProfileProps = {
  profile: ProfileType | null;
  status: string | null;
  isOwner: boolean;
  myProfileId: number | null;

  saveChangedProfile: (formData: saveChangedProfileFormDataType) => Promise<void>;
  saveAvatar: (file: any) => Promise<void>;
  updateUserStatus: (status: string) => Promise<void>;

}

const Profile: React.FC<ProfileProps> = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveAvatar,
  saveChangedProfile,
  myProfileId,
}) => {
  return (
    <div className={style.profilePage}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        isOwner={isOwner}
        saveAvatar={saveAvatar}
        saveChangedProfile={saveChangedProfile}
        ownerId={myProfileId}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
