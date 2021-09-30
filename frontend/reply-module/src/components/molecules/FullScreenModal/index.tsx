import Modal, { FadeInDirection } from "@/components/atoms/Modal";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { Dispatch, ReactNode, useContext, useEffect, useState } from "react";

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
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    setIsOpen(false);
    postCloseModal();
  };

  const onMessageFromDeployScript = ({ data }: MessageEvent) => {
    if (data.type !== postType) {
      return;
    }

    setValue(data.data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (port) {
      port.removeEventListener("message", onMessageFromDeployScript);
      port.addEventListener("message", onMessageFromDeployScript);
      port.start();
    }
  }, [port]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom={fadeInFrom}>
      {children}
    </Modal>
  );
};

export default FullScreenModal;
