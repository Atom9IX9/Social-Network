import {
  useLocation,
  useParams,
  useNavigate,
  NavigateFunction,
  Location,
} from "react-router-dom";

function withRouter<P>(Component: React.ComponentType<P>) {
  let ComponentWithRouterProp: React.FC<P> = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
        key="ComponentWithRouter"
      />
    );
  };

  return ComponentWithRouterProp;
}

export default withRouter;

export type Router<Params> = {
  location: Location;
  navigate: NavigateFunction;
  params: Params;
};
