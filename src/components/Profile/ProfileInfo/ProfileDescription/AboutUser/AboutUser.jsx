import * as React from 'react';
import style from "../ProfileDescription.module.css";

const AboutUser = ({ profile, toggleEditMode, isOwner }) => {
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

const Contact = ({ linkName, link }) => {
  if (!link) return;

  return (
    <div>
      <span>{linkName}</span>: <a href={link} target="_blank" rel="noreferrer"><span>{link}</span></a>
    </div>
  );
};

export default AboutUser;
