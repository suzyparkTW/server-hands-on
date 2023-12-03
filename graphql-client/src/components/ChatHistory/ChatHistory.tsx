import useChatHistory from "./useChatHistory";

const ChatHistory = () => {
  const { chatHistory } = useChatHistory();

  return (
    <div className="history">
      {chatHistory?.map((chat, index) => (
        <div key={index}>
          <span className="dateTime">{chat.createdAt}</span>
          {chat.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
