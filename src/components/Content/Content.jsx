import React from "react";
import News from "../News/News";
import Settings from "../Settings/Settings";
import UsersContainer from "../Users/UsersContainer";
import Music from "../Music/Music";
import { Navigate, Route, Routes } from "react-router-dom";
import style from "./Content.module.css";
import Login from "../common/Login/Login";
import withSuspense from "../../hoc/withSuspense";

const MessagesContainer = withSuspense(
  React.lazy(() => import("../Messages/MessagesContainer"))
);

const ProfileContainer = withSuspense(
  React.lazy(() => import("../Profile/ProfileContainer"))
);

const Content = ({ isActiveNav, toggleNav }) => {
  return (
    <div
      className={`${style.appContentContainer} ${
        isActiveNav ? style.activeNav : ""
      }`}
    >
      <div
        className={style.navBurgerBtn}
        onClick={() => {
          isActiveNav ? toggleNav(false) : toggleNav(true);
        }}
      >
        <span className={style.btnLine1}></span>
        <span className={style.btnLine2}></span>
        <span className={style.btnLine3}></span>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<UsersContainer pageTitle="Users" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages/*" element={<MessagesContainer />} />
        <Route path="/profile/:userId" element={<ProfileContainer />} />
        <Route path="/profile" element={<ProfileContainer />} />
      </Routes>
    </div>
  );
};

export default Content;
