import Modal, { FadeInDirection } from "@/components/@molecules/Modal";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { ReactNode, useEffect } from "react";

export interface Props {
  isOpen: boolean;
  openModal: () => void;
  setValue: (data: any) => void;
  children: ReactNode;
  postCloseModal: () => void;
  postType: string;
  fadeInFrom?: FadeInDirection;
}

const FullScreenModal = ({
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

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom={fadeInFrom}>
      {children}
    </Modal>
  );
};

export default FullScreenModal;
