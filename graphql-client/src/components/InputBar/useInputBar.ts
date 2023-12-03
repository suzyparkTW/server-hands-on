import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SEND_CHAT } from "../../api/chat.mutation";

const useInputBar = () => {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [mutateSendChat] = useMutation(SEND_CHAT);

  const sendChat = () => {
    mutateSendChat({
      variables: {
        text: input,
        createdAt: new Date(),
      },
      onCompleted: () => {
        setInput("");
      },
    });
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
