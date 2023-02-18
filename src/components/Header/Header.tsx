import style from "./Header.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../assets/img/defaultUserAv.jpg";
import { useDispatch, useSelector } from "react-redux";
import { rootStateType } from "../../redux/reduxStore";
import { logout } from "../../redux/authReducer";
// * antd
import { Layout, Button } from "antd";
import Avatar from "antd/es/avatar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Row } from "antd/es/grid";

const { Header } = Layout;

const HeaderC: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  const profile = useSelector(
    (state: rootStateType) => state.auth.ownerProfile
  );

  const dispatch = useDispatch<any>();

  return (
    <Header style={{ padding: 0 }}>
      <Row>
        <Col span={1} offset={1}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              style: { color: "#d4d4d4" },
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Col>

        {isAuth ? (
          <Col span={22}>
            <div className={style.authProfile}>
              <div>
                <Button
                  color="red"
                  type="primary"
                  onClick={() => dispatch(logout())}
                >
                  Log out
                </Button>
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
          </Col>
        ) : (
          <Col span={22} push={20}>
            <Button type="primary">
              <NavLink to="/login">Log in</NavLink>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default HeaderC;

type HeaderProps = {
  collapsed: boolean;
  setCollapsed: any;
};
