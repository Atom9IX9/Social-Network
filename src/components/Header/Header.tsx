import style from "./Header.module.css";
import React, { useState } from "react";
import Logo from "../../assets/img/logo.jpg";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../assets/img/defaultUserAv.jpg";
import { useDispatch, useSelector } from "react-redux";
import { rootStateType } from "../../redux/reduxStore";
import { logout } from "../../redux/authReducer";
// * antd
import { Layout, theme } from "antd";
import Avatar from "antd/es/avatar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Row } from "antd/es/grid";

const { Header } = Layout;

const HeaderC: React.FC<HeaderProps> = ({collapsed, setCollapsed}) => {
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  const profile = useSelector(
    (state: rootStateType) => state.auth.ownerProfile
  );

  const dispatch = useDispatch<any>();
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row>
        <Col span={1}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Col>
        <Col span={23}>
          {isAuth ? (
            <div className={style.authProfile}>
              <div>
                <button onClick={() => dispatch(logout())}>Log out</button>
              </div>
              <NavLink to="/profile" className={style.redirectProfile}>
                <div className={style.login}>{profile?.fullName}</div>
                {profile && (
                  <Avatar
                    size={50}
                    src={
                      profile.photos.small ? profile.photos.small : UserAvatar
                    }
                    shape="circle"
                  />
                )}
              </NavLink>
            </div>
          ) : (
            <div className={style.loginBlock}>
              <NavLink to="/login">Log in</NavLink>
            </div>
          )}
        </Col>
      </Row>
      
        
      
    </Header>
  );
};

export default HeaderC;

type HeaderProps = {
  collapsed: boolean;
  setCollapsed: any
};
