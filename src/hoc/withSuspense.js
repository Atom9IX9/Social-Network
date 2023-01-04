import React, {Suspense} from "react"
import Preloader from "../components/common/Preloader/Preloader"

const withSuspense = (Component) => {
  let WrappedComponent = (props) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    )
  }
  return WrappedComponent
}

export default withSuspense;