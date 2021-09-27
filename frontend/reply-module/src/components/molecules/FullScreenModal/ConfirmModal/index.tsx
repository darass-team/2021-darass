import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useEffect, useState } from "react";
import { ButtonWrapper, CancelButton, ConfirmButton, Container, Message, Modal } from "./styles";

const ConfirmModal = () => {
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    setIsOpen(false);
    messageFromReplyModal(port).closeConfirmModal();
  };

  const onClickConfirmOk = () => {
    messageFromReplyModal(port).clickedConfirmOk();
  };

  const onClickConfirmNo = () => {
    messageFromReplyModal(port).clickedConfirmNo();
    setIsOpen(false);
  };

  const onMessageConfirmModal = ({ data }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM) {
      return;
    }

    setText(data.data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (port) {
      port.removeEventListener("message", onMessageConfirmModal);
      port.addEventListener("message", onMessageConfirmModal);
      port.start();
    }
  }, [port]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom="center">
      <Container>
        <Message>{text}</Message>
        <ButtonWrapper>
          <ConfirmButton type="button" onClick={onClickConfirmOk}>
            예
          </ConfirmButton>
          <CancelButton type="button" onClick={onClickConfirmNo}>
            아니요
          </CancelButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;
