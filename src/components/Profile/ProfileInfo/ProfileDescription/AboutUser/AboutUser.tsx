import * as React from 'react';
import { ProfileType } from '../../../../../types/types';
import style from "../ProfileDescription.module.css";

type TAboutUserProps = {
  profile: ProfileType;
  toggleEditMode: () => void;
  isOwner: boolean;
}

const AboutUser: React.FC<TAboutUserProps> = ({ profile, toggleEditMode, isOwner }) => {
  let contactLinks = Object.keys(profile.contacts).map((key) => {
    if (!profile.contacts[key]) return null;
    return <Contact  key={key} linkName={key} link={profile.contacts[key]} />;
  }).filter(c => c !== null);

  return (
    <>
      <div className={style.aboutMe}>{profile.aboutMe}</div>
      <h5>About Job</h5>
      <div className={style.lookingForAJob}>
        Need work: {profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div className={style.workDescription}>
        {profile.lookingForAJobDescription}
      </div>
      <div className={style.contacts}>
        contacts: {contactLinks.length ? contactLinks : "no contacts"}
      </div>
      {isOwner && <button onClick={toggleEditMode}>edit</button>}
    </>
  );
};

type TContactProps = {
  linkName: string;
  link: string;
}

const Contact: React.FC<TContactProps> = ({ linkName, link }) => {
  if (!link) return null;

  return (
    <div>
      <span>{linkName}</span>: <a href={link} target="_blank" rel="noreferrer"><span>{link}</span></a>
    </div>
  );
};

export default AboutUser;
