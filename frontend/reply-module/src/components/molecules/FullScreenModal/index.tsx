import Modal, { FadeInDirection } from "@/components/atoms/Modal";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { Dispatch, ReactNode, useEffect } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  setValue: Dispatch<any>;
  children: ReactNode;
  postCloseModal: () => void;
  postType: string;
  fadeInFrom?: FadeInDirection;
}

const FullScreenModal = ({
  isOpen,
  setIsOpen,
  setValue,
  children,
  postCloseModal,
  postType,
  fadeInFrom = "center"
}: Props) => {
  const { receivedMessageFromReplyModule } = useMessageChannelFromReplyModalContext();

  const onCloseModal = () => {
    setIsOpen(false);
    postCloseModal();
  };

  useEffect(() => {
    if (!receivedMessageFromReplyModule) return;
    if (receivedMessageFromReplyModule.type !== postType) return;

    setValue(receivedMessageFromReplyModule.data);
    setIsOpen(true);
  }, [receivedMessageFromReplyModule]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom={fadeInFrom}>
      {children}
    </Modal>
  );
};

export default FullScreenModal;
