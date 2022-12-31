import { connect } from "react-redux";
import Content from "./Content";
import { toggleNav } from "../../redux/contentReducer";
import { compose } from "redux";
import { getIsActiveNav } from "../../redux/selectors";

let mapStateToProps = (state) => {
  return {
    isActiveNav: getIsActiveNav(state),
  };
};

export default compose(connect(mapStateToProps, { toggleNav }))(Content);
