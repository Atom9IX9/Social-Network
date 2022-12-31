import { useLocation, useParams, useNavigate } from "react-router-dom";

let withRouter = (Component) => {
  let ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

export default withRouter;
