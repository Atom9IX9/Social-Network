import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

function withSuspense<P>(Component: React.ComponentType<P>) {
  let WrappedComponent: React.FC<P> = (props) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} key="ComponentWithSuspense" />
      </Suspense>
    );
  };
  return WrappedComponent;
};

export default withSuspense;
