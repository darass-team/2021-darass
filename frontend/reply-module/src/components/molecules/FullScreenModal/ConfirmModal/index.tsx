import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useEffect, useState } from "react";
import { postCloseConfirm, postConfirmNo, postConfirmOK } from "../../../../utils/postMessage";
import { ButtonWrapper, CancelButton, ConfirmButton, Container, Message, Modal } from "./styles";

const ConfirmModal = () => {
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
    postCloseConfirm();
  };

  useEffect(() => {
    const onMessageConfirmModal = ({ data }: MessageEvent) => {
      if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM) {
        setIsOpen(false);

        return;
      }

      setText(data.data);
      setIsOpen(true);
    };

    window.addEventListener("message", onMessageConfirmModal);

    return () => window.removeEventListener("message", onMessageConfirmModal);
  }, []);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom="center">
      <Container>
        <Message>{text}</Message>
        <ButtonWrapper>
          <ConfirmButton type="button" onClick={postConfirmOK}>
            예
          </ConfirmButton>
          <CancelButton type="button" onClick={postConfirmNo}>
            아니요
          </CancelButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;
