import { useEffect, useState } from "react";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { messageFromReplyModule } from "@/utils/postMessage";
import throttling from "@/utils/throttle";

export const useReplyModuleApp = () => {
  const [port, setPort] = useState<MessagePort>();
  const [receivedMessageFromReplyModal, setReceivedMessageFromReplyModal] = useState<MessageEvent["data"]>();

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);

    window.removeEventListener("message", onMessageInitMessageChannel);
  };

  useEffect(() => {
    if (!port) return;

    const onResize = throttling({ callback: messageFromReplyModule(port).setScrollHeight, delay: 600 });
    window.addEventListener("resize", onResize);

    const onListenMessage = ({ data }: MessageEvent) => {
      setReceivedMessageFromReplyModal(data);
    };
    port.removeEventListener("message", onListenMessage);
    port.addEventListener("message", onListenMessage);
    port.start();

    return () => {
      window.removeEventListener("resize", onResize);
      port.removeEventListener("message", onListenMessage);
    };
  }, [port]);

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.REQUEST_PORT }, "*");

    return () => window.removeEventListener("message", onMessageInitMessageChannel);
  }, []);

  return { port, receivedMessageFromReplyModal };
};
