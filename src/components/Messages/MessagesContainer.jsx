import { connect } from "react-redux";
import { addMessageFromForm } from "../../redux/messagesReducer";
import Messages from "./Messages";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getMessages, getMessagesContacts } from "../../redux/selectors";

let mapStateToProps = (state) => {
  return {
    contacts: getMessagesContacts(state),
    messages: getMessages(state),
  };
};

export default compose(
  connect(mapStateToProps, { addMessageFromForm }),
  withAuthRedirect
)(Messages);
