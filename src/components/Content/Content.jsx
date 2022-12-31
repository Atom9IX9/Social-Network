import React from "react";
import News from "../News/News";
//import ProfileContainer from "../Profile/ProfileContainer";
import Settings from "../Settings/Settings";
import UsersContainer from "../Users/UsersContainer";
//import MessagesContainer from "../Messages/MessagesContainer";
import Music from "../Music/Music";
import { Route, Routes } from "react-router-dom";
import style from "./Content.module.css";
import Login from "../common/Login/Login";
import Preloader from "../common/Preloader/Preloader";

const MessagesContainer = React.lazy(() =>
  import("../Messages/MessagesContainer")
);

const ProfileContainer = React.lazy(() =>
  import("../Profile/ProfileContainer")
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
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/messages/*"
          element={
            <React.Suspense fallback={<Preloader />}>
              <MessagesContainer />
            </React.Suspense>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <React.Suspense fallback={<Preloader />}>
              <ProfileContainer />
            </React.Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <React.Suspense fallback={<Preloader />}>
              <ProfileContainer />
            </React.Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default Content;
