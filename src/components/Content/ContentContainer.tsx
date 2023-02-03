import { connect } from "react-redux";
import Content from "./Content";
import { toggleNav } from "../../redux/contentReducer";
import { compose } from "redux";
import { getIsActiveNav } from "../../redux/selectors";
import { rootStateType } from "../../redux/reduxStore";

let mapStateToProps = (state: rootStateType): TMapStateToProps => {
  return {
    isActiveNav: getIsActiveNav(state),
  };
};

type TMapStateToProps = {
  isActiveNav: boolean;
};
type TMapDispatchToProps = {
  toggleNav: (isActive: boolean) => void;
};

export default compose(
  connect<TMapStateToProps, TMapDispatchToProps, {}, rootStateType>(
    mapStateToProps,
    { toggleNav }
  )
)(Content);
