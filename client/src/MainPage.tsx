import ChatHistory from "./components/ChatHistory";
import InputBar from "./components/InputBar";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="wrapper">
      <ChatHistory />
      <InputBar />
    </div>
  );
};

export default MainPage;
