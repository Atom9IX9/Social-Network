import s from "../ProfileDescription.module.css";

const AboutUser = ({ profile, toggleEditMode, isOwner }) => {
  let contactLinks = Object.keys(profile.contacts).map((key) => {
    if (!profile.contacts[key]) return null;
    return <Contact linkName={key} link={profile.contacts[key]} />;
  }).filter(c => c !== null);
  
  return (
    <>
      <div className={s.aboutMe}>{profile.aboutMe}</div>
      <h5>About Job</h5>
      <div className={s.lookingForAJob}>
        Need work: {profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div className={s.workDescription}>
        {profile.lookingForAJobDescription}
      </div>
      <div className={s.contacts}>
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
      <span>{linkName}</span>: <span>{link}</span>
    </div>
  );
};

export default AboutUser;
