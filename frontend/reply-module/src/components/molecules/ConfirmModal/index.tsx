import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import FullScreenModal from "../FullScreenModal";
import { ButtonWrapper, CancelButton, ConfirmButton, Container, Message } from "./styles";
import { useConfirmModal } from "./useConfirmModal";

const ConfirmModal = () => {
  const { isOpen, data, setData, openModal, onCloseModal, onClickConfirmOk } = useConfirmModal();

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM}
    >
      <Container>
        <Message>{data}</Message>
        <ButtonWrapper>
          <ConfirmButton type="button" onClick={onClickConfirmOk}>
            예
          </ConfirmButton>
          <CancelButton type="button" onClick={onCloseModal}>
            아니요
          </CancelButton>
        </ButtonWrapper>
      </Container>
    </FullScreenModal>
  );
};

export default ConfirmModal;
