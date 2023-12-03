import { useState } from "react";
import { trpc } from "../../utils/trpc";

const useInputBar = () => {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const mutateSendChat = trpc.sendChat.useMutation();

  const sendChat = () => {
    mutateSendChat.mutate(
      { text: input, createdAt: new Date().toString() },
      {
        onSuccess: () => {
          setInput("");
        },
      }
    );
  };

  const isSendButtonDisabled = input.length === 0;

  const handleSendButtonClick = () => {
    sendChat();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (isSendButtonDisabled) return;

    sendChat();
  };

  return {
    input,
    isSendButtonDisabled,
    handleInputChange,
    handleSendButtonClick,
    handleKeyDown,
  };
};

export default useInputBar;
