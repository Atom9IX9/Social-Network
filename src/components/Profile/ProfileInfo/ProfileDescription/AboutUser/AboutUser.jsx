import s from "../ProfileDescription.module.css";

const AboutUser = ({ profile }) => {
  return (
    <>
      <div className={s.aboutMe}>{profile.aboutMe}</div>
      <h5>About Job</h5>
      <div className={s.lookingForAJob}>
        Need work: {profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div className={s.workDescription}>
        {profile.lookingForAJobDescription}{" "}
      </div>
    </>
  );
};

export default AboutUser;
