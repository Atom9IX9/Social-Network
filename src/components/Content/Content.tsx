import React from "react";
import News from "../News/News";
import Settings from "../Settings/Settings";
import UsersPage from "../Users/UsersPage";
import Music from "../Music/Music";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../common/Login/Login";
import withSuspense from "../../hoc/withSuspense";
import { Content } from "antd/es/layout/layout";

const MessagesContainer = withSuspense(
  React.lazy<React.ComponentType>(() => import("../Messages/MessagesContainer"))
);
const ProfileContainer = withSuspense(
  React.lazy<React.ComponentType>(() => import("../Profile/ProfileContainer"))
);

const ContentC: React.FC<TContentProps> = ({ bg }) => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: bg,
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages/*" element={<MessagesContainer />} />
        <Route path="/profile/:userId" element={<ProfileContainer />} />
        <Route path="/profile" element={<ProfileContainer />} />
      </Routes>
    </Content>
  );
};

export default ContentC;

type TContentProps = {
  bg: string
};
