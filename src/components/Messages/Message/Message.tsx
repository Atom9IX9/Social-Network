const Message: React.FC<TMessageProps> = ({className, message}) => {
  return <div className={className}>{message}</div>;
};

export default Message;

type TMessageProps = { className: string; message: string }
