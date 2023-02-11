import { connect } from "react-redux";
import {
  addMessageFromForm,
  ContactType,
  MessageFormDataType,
  MessageType,
} from "../../redux/messagesReducer";
import Messages from "./Messages";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getMessages, getMessagesContacts } from "../../redux/selectors";
import { rootStateType } from "../../redux/reduxStore";
import { ComponentType } from "react";

let mapStateToProps = (state: rootStateType) => {
  return {
    contacts: getMessagesContacts(state),
    messages: getMessages(state),
  };
};

export default compose<ComponentType>(
  connect<MapStateToProps, MapDispatchToProps, {}, rootStateType>(
    mapStateToProps,
    { addMessageFromForm }
  ),
  withAuthRedirect
)(Messages);

type MapStateToProps = {
  contacts: Array<ContactType>;
  messages: Array<MessageType>;
};
type MapDispatchToProps = {
  addMessageFromForm: (formData: MessageFormDataType) => void;
};
