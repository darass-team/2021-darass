import { Container, Message, ButtonWrapper, ConfirmButton, CancelButton, Modal } from "./styles";

export interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <Modal>
      <Container>
        <Message>{message}</Message>
        <ButtonWrapper>
          <ConfirmButton type="button" onClick={onConfirm}>
            예
          </ConfirmButton>
          <CancelButton type="button" onClick={onCancel}>
            아니요
          </CancelButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;
