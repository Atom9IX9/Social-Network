import * as React from "react";
import Link from "./Link/Link";
import Sider from "antd/es/layout/Sider";
import {
  UserOutlined,
  CustomerServiceOutlined,
  ExceptionOutlined,
  SettingOutlined,
  FileSearchOutlined,
  CommentOutlined,
  MessageOutlined
} from "@ant-design/icons";
import { Menu } from "antd";

const Navbar: React.FC<TNavbarProps> = ({ collapsed }) => {
  return (
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
                label: <Link linkName="Chat" path="chat" />
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
