import useChatHistory from "./useChatHistory";

const ChatHistory = () => {
  const { chatHistory, missionList } = useChatHistory();

  console.log(missionList.data?.missionList)

  return (
    <div className="history">
      {chatHistory?.map((chat, index) => (
        <div key={index}>
          <span className="dateTime">{chat.createdAt}</span>
          {/* {chat.text} */}
          {JSON.stringify(missionList.data?.missionList.rows[0])}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
