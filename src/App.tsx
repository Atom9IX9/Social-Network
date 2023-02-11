import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./App.css";
import ConnectionError from "./components/common/Error/ConnectionError";
import Preloader from "./components/common/Preloader/Preloader";
import Content from "./components/Content/ContentContainer";
import Header from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/NavigationbarContainer";
import withRouter from "./hoc/withRouter";
import { initialize } from "./redux/appReducer";
import { rootStateType } from "./redux/reduxStore";
import { getAppInitialized } from "./redux/selectors";

class App extends React.Component<AppProps> {
  catchAllErrors = (e: PromiseRejectionEvent) => alert("error");

  componentDidMount = () => {
    this.props.initialize();
    window.addEventListener("unhandledrejection", this.catchAllErrors);
  };
  componentWillUnmount = () => {
    window.addEventListener("unhandledrejection", this.catchAllErrors);
  };

  render = () => {
    if (this.props.initialized === true) {
      return (
        <div className="app-container">
          <Header />
          <Navbar />
          <Content />
        </div>
      );
    } else if (this.props.initialized === "ERR_NETWORK") {
      return <ConnectionError />;
    } else {
      return <Preloader />;
    }
  };
}

const mapStateToProps = (state: rootStateType): MapStateToProps => {
  return { initialized: getAppInitialized(state) };
};

export default compose<React.ComponentType>(
  withRouter,
  connect<MapStateToProps, MapDispatchToProps, {}, rootStateType>(
    mapStateToProps,
    {
      initialize,
    }
  )
)(App);

type MapStateToProps = {
  initialized: boolean | string;
};
type MapDispatchToProps = {
  initialize: () => void;
};
type AppProps = MapStateToProps & MapDispatchToProps;
