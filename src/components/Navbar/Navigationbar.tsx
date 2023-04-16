import * as React from "react";
import Link from "./Link/Link";
import logo from "../../assets/img/logo.svg";
import Sider from "antd/es/layout/Sider";
import {
  UserOutlined,
  CustomerServiceOutlined,
  ExceptionOutlined,
  SettingOutlined,
  FileSearchOutlined,
  CommentOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar: React.FC<TNavbarProps> = ({ collapsed }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(["1"]);
  useEffect(() => {
    let path = location.pathname;
    if(path === "/profile") setCurrentPage(["1"])
    else if(path === "/messages") setCurrentPage(["2"])
    else if(path === "/users") setCurrentPage(["3"])
    else if(path === "/chat") setCurrentPage(["4"])
    else if(path === "/news") setCurrentPage(["5"])
    else if(path === "/music") setCurrentPage(["6"])
    else if(path === "/settings") setCurrentPage(["7"])
  }, [location.pathname]);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <img style={{ width: "60%" }} src={logo} alt="logo" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={currentPage}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link linkName="Profile" path="profile" />,
          },
          {
            key: "2",
            icon: <MessageOutlined />,
            label: <Link linkName="Messages" path="messages" />,
          },
          {
            key: "3",
            icon: <FileSearchOutlined />,
            label: <Link linkName="Users" path="users" />,
          },
          {
            key: "4",
            icon: <CommentOutlined />,
            label: <Link linkName="Chat" path="chat" />,
          },
          {
            key: "5",
            icon: <ExceptionOutlined />,
            label: <Link linkName="News" path="news" />,
          },
          {
            key: "6",
            icon: <CustomerServiceOutlined />,
            label: <Link linkName="Music" path="music" />,
          },
          {
            key: "7",
            icon: <SettingOutlined />,
            label: <Link linkName="Settings" path="settings" />,
          },
        ]}
      />
    </Sider>
  );
};

export default Navbar;

type TNavbarProps = { collapsed: boolean };
