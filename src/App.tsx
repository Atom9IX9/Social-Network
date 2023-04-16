import React, { useState, useEffect } from "react";

// * redux/react-redux
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";

// * components
import ConnectionError from "./components/common/Error/ConnectionError";
import Preloader from "./components/common/Preloader/Preloader";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navigationbar";

import withRouter from "./hoc/withRouter";

import { initialize } from "./redux/appReducer";
import { getAppInitialized } from "./redux/selectors";

// * antd
import { Layout, theme } from "antd";

const App: React.FC<AppProps> = () => {
  // * selectors
  const initialized = useSelector(getAppInitialized);

  // * antd

  // * menu/burger button connection
  const [collapsed, setCollapsed] = useState(false);
  // * bg
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch<any>();

  const catchAllErrors = (e: PromiseRejectionEvent) => alert("error"); //? react on all errors

  // * catching all errors in api
  useEffect(() => {
    dispatch(initialize());
    // window.addEventListener("unhandledrejection", catchAllErrors);
  }, []);

  if (initialized === true) {
    return (
      <Layout>
        <Navbar collapsed={collapsed} />
        <Layout className="site-layout">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content bg={colorBgContainer} />
        </Layout>
      </Layout>
    );
  } else if (initialized === "ERR_NETWORK") {
    return <ConnectionError />;
  } else {
    return <Preloader />;
  }
};

export default compose<React.ComponentType>(withRouter)(App);

type AppProps = {};
