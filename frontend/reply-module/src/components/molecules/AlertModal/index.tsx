import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import FullScreenModal from "../FullScreenModal";
import { ButtonWrapper, Container, Message, OkButton } from "./styles";
import { useAlertModal } from "./useAlertModal";

const AlertModal = () => {
  const { isOpen, data, setData, openModal, onCloseModal } = useAlertModal();

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.ALERT}
    >
      <Container data-testid="alert-modal-container">
        <Message>{data}</Message>
        <ButtonWrapper>
          <OkButton type="button" onClick={onCloseModal}>
            확인
          </OkButton>
        </ButtonWrapper>
      </Container>
    </FullScreenModal>
  );
};

export default AlertModal;
