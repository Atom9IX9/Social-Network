import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import "./App.css";
import ConnectionError from "./components/common/Error/ConnectionError";
import Preloader from "./components/common/Preloader/Preloader";
// import Content from "./components/Content/ContentContainer";
import Header from "./components/Header/Header";
// import Navbar from "./components/Navbar/Navigationbar";
import withRouter from "./hoc/withRouter";
import { initialize } from "./redux/appReducer";
import { rootStateType } from "./redux/reduxStore";
import { getAppInitialized } from "./redux/selectors";
import Link from "./components/Navbar/Link/Link";
// * antd
import {
  UserOutlined,
  CustomerServiceOutlined,
  ExceptionOutlined,
  SettingOutlined,
  FileSearchOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import MemoizedUsersPage from "./components/Users/UsersPage";
import Login from "./components/common/Login/Login";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const { Sider, Content } = Layout;

const App: React.FC<AppProps> = () => {
  const initialized = useSelector(getAppInitialized);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch<any>();

  const catchAllErrors = (e: PromiseRejectionEvent) => alert("error");

  useEffect(() => {
    dispatch(initialize());
    window.addEventListener("unhandledrejection", catchAllErrors);
  }, []);

  if (initialized === true) {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">logo</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link linkName="Profile" path="profile" />,
              },
              {
                key: "2",
                icon: <CommentOutlined />,
                label: <Link linkName="Messages" path="messages" />,
              },
              {
                key: "3",
                icon: <FileSearchOutlined />,
                label: <Link linkName="Users" path="users" />,
              },
              {
                key: "4",
                icon: <ExceptionOutlined />,
                label: <Link linkName="News" path="news" />,
              },
              {
                key: "5",
                icon: <CustomerServiceOutlined />,
                label: <Link linkName="Music" path="music" />,
              },
              {
                key: "6",
                icon: <SettingOutlined />,
                label: <Link linkName="Settings" path="settings" />,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<MemoizedUsersPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/messages/*" element={<MessagesContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>

      // <div className="app-container">
      //   <Header />
      //   <Navbar />
      //   <Content />
      // </div>
    );
  } else if (initialized === "ERR_NETWORK") {
    return <ConnectionError />;
  } else {
    return <Preloader />;
  }
};

export default compose<React.ComponentType>(withRouter)(App);

type AppProps = {};
