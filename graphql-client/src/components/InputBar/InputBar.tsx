import useInputBar from "./useInputBar";

const InputBar = () => {
  const {
    input,
    isSendButtonDisabled,
    handleInputChange,
    handleSendButtonClick,
    handleKeyDown,
  } = useInputBar();

  return (
    <div className="inputBar">
      <input
        className="input"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={`button ${isSendButtonDisabled ? "disabled" : ""}`}
        disabled={isSendButtonDisabled}
        onClick={handleSendButtonClick}
      >
        보내기
      </button>
    </div>
  );
};

export default InputBar;
