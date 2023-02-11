import React from "react";
import Header from "./Header";
import { logout } from "../../redux/authReducer";
import { connect } from "react-redux";
import { ProfileType } from "../../types/types";
import { rootStateType } from "../../redux/reduxStore";

class HeaderContainer extends React.Component<THeaderContainerProps> {
  render() {
    return <Header {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state: rootStateType): TMapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.auth.userProfile,
  };
};

export default connect<
  TMapStateToProps,
  TMapDispatchToProps,
  {},
  rootStateType
>(mapStateToProps, {
  logout,
})(HeaderContainer);

type TMapStateToProps = {
  isAuth: boolean;
  login: string | null;
  profile: ProfileType | null;
};
type TMapDispatchToProps = {
  logout: () => void;
};
type THeaderContainerProps = TMapStateToProps & TMapDispatchToProps;
