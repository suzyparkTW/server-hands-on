import "./App.css";
import ChatHistory from "./components/ChatHistory";
import InputBar from "./components/InputBar";

function App() {
  return (
    <div className="wrapper">
      <ChatHistory />
      <InputBar />
    </div>
  );
}

export default App;
