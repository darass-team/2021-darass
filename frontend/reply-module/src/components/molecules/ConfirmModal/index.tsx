import { useState } from "react";
import { postCloseConfirm, postConfirmNo, postConfirmOK } from "../../../utils/postMessage";
import { Container, Message, ButtonWrapper, ConfirmButton, CancelButton, Modal } from "./styles";

export interface Props {
  message: string;
}

const ConfirmModal = ({ message }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <Message>{message}</Message>
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
