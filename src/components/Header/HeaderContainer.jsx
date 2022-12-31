import React from "react";
import Header from "./Header";
import { logout } from "../../redux/authReducer";
import { connect } from "react-redux";
import { compose } from "redux";

class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.auth.userProfile,
  };
};

export default compose(
  connect(mapStateToProps, {
    logout
  })
)(HeaderContainer);
