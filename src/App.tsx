import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import "./App.css";
import ConnectionError from "./components/common/Error/ConnectionError";
import Preloader from "./components/common/Preloader/Preloader";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
// import Navbar from "./components/Navbar/Navigationbar";
import withRouter from "./hoc/withRouter";
import { initialize } from "./redux/appReducer";
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

const { Sider } = Layout;

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
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content colorBgContainer={colorBgContainer} />
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
