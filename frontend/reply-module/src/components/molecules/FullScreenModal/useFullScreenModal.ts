import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { useEffect } from "react";
import { Props } from ".";

export const useFullScreenModal = ({
  isOpen,
  openModal,
  setValue,
  children,
  postCloseModal,
  postType,
  fadeInFrom = "center"
}: Props) => {
  const { receivedMessageFromReplyModule } = useMessageChannelFromReplyModalContext();

  const onCloseModal = () => {
    postCloseModal();
  };

  useEffect(() => {
    if (!receivedMessageFromReplyModule) return;
    if (receivedMessageFromReplyModule.type !== postType) return;

    setValue(receivedMessageFromReplyModule.data);
    openModal();
  }, [receivedMessageFromReplyModule]);

  return { onCloseModal };
};
