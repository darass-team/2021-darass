import { useEffect, useState } from "react";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";

export const useReplyModalApp = () => {
  const [port, setPort] = useState<MessagePort>();
  const [receivedMessageFromReplyModule, setReceivedMessageFromReplyModule] = useState<MessageEvent["data"]>();

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);
    window.removeEventListener("message", onMessageInitMessageChannel);
  };

  const onListenMessage = ({ data }: MessageEvent) => {
    setReceivedMessageFromReplyModule(data);
  };

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.REQUEST_PORT }, "*");

    return () => window.removeEventListener("message", onMessageInitMessageChannel);
  }, []);

  useEffect(() => {
    if (!port) return;

    port.removeEventListener("message", onListenMessage);
    port.addEventListener("message", onListenMessage);
    port.start();

    return () => port.removeEventListener("message", onListenMessage);
  }, [port]);

  return {
    port,
    receivedMessageFromReplyModule
  };
};
