import io from "socket.io-client";
import { BASE_URL } from "../utils";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../context/ModalContext";
import { MessagesContext } from "../context/MessagesContext";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const { user, getCurrentUser } = useContext(AuthContext);
  const { alert } = useContext(ModalContext);
  const {
    setEnhancing,
    appendMessage,
    setGenerating,
    setRuningThread,
    appendEnhancedToken,
    setPropertyMessagePlural,
    setThreadMessages,
  } = useContext(MessagesContext);

  const setupSocket = () => {
    const currentSocket = io(BASE_URL, {
      transports: ["websocket"],
    });

    currentSocket.on("connect", () => handleConnection(currentSocket));

    currentSocket.on("message", handleMessage);

    currentSocket.on("message_stream", handleMessageStream);

    currentSocket.on("message_stream_end", handleFinishEnhanced);

    currentSocket.on("message_stream_enhance", handleStreamEnhanced);

    currentSocket.on("message_stream_enhance_end", handleFinishEnhanced);

    currentSocket.on("thread_messages", handleThreadMessages);

    currentSocket.on("error", handleError);

    setSocket(currentSocket);
  };

  const handleMessage = (data) => {
    appendMessage(data);
    setGenerating(false);
  };

  const handleThreadMessages = (messages) => {
    setThreadMessages(messages);
    setRuningThread(false);
  };

  const handleMessageStream = (data) => {
    if (
      data.content &&
      data.content !== null &&
      !String(data.content) !== "undefined" &&
      !String(data.content).includes("undefined")
    ) {
      setPropertyMessagePlural(data.message_id, "content", data.content);
    }
  };

  const handleStreamEnhanced = (data) => {
    if (
      data.content &&
      data.content !== null &&
      !String(data.content) !== "undefined" &&
      !String(data.content).includes("undefined")
    ) {
      appendEnhancedToken(data.content);
    }
  };

  const handleConnection = (socket) => {
    const room = `user-${user.user_id}`;
    socket.emit("join_room", room);
  };

  const handleError = (data) => {
    alert(data);
  };

  const handleFinishEnhanced = () => {
    setGenerating(false);
    setEnhancing(false);
    getCurrentUser();
  };

  return [socket, setupSocket];
};

export default useSocket;
