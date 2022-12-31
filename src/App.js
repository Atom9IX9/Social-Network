import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";
import ContentContainer from "./components/Content/ContentContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/Navbar/NavigationbarContainer";
import withRouter from "./hoc/withRouter";
import { initialize } from "./redux/appReducer";
import { getAppInitialized } from "./redux/selectors";

class App extends React.Component {
  componentDidMount = () => {
    this.props.initialize();
  };

  render = () => {
    if (this.props.initialized) {
      return (
        <div className="app-container">
          <HeaderContainer />
          <NavbarContainer />
          <ContentContainer />
        </div>
      );
    } else {
      return <Preloader />
    }
  };
}

const mapStateToProps = (state) => {
  return { initialized: getAppInitialized(state) };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    initialize,
  })
)(App);
