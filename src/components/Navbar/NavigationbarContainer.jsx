import { connect } from "react-redux";
import { compose } from "redux";
import Navbar from "./Navigationbar";

let mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends,
    links: state.sidebar.links,
  };
};

export default compose(connect(mapStateToProps))(Navbar);
