import { connect } from "react-redux";
import { rootStateType } from "../../redux/reduxStore";
import { SidebarFriendType, SidebarLinkType } from "../../redux/sidebarReducer";
import Navbar from "./Navigationbar";

type TMapStateToProps = {
  friends: Array<SidebarFriendType>;
  links: Array<SidebarLinkType>;
};

let mapStateToProps = (state: rootStateType): TMapStateToProps => {
  return {
    friends: state.sidebar.friends,
    links: state.sidebar.links,
  };
};

export default connect<TMapStateToProps, {}, {}, rootStateType>(
  mapStateToProps
)(Navbar);
