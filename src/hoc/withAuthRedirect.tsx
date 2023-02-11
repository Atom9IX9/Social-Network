import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { rootStateType } from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: rootStateType): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
  };
};

function withAuthRedirect<P>(Component: React.ComponentType<P>) {
  const AuthRedirect: React.FC<MapStateToProps> = (props) => {
    const {isAuth, ...restProps} = props;
    if (!isAuth) return <Navigate to="/login" />;
    return <Component {...restProps as P} key="WithAuthRedirectComponent" />;
  };

  let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(AuthRedirect);

  return ConnectedAuthRedirect;
};

export default withAuthRedirect;
type MapStateToProps = {
  isAuth: boolean;
}

