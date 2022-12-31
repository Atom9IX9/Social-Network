import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const withAuthRedirect = (Component) => {
  const AuthRedirect = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  };

  let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(AuthRedirect);

  return ConnectedAuthRedirect;
};

export default withAuthRedirect;
