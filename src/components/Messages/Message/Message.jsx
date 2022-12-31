import s from "./Message.module.css";

const Message = (props) => {
  return <div className={props.className}>{props.message}</div>;
};

export default Message;
