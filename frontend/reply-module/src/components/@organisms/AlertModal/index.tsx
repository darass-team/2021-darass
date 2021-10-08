import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { useState } from "react";
import FullScreenModal from "@/components/@molecules/FullScreenModal";
import { ButtonWrapper, Container, Message, OkButton } from "./styles";

const AlertModal = () => {
  const [data, _setData] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeAlertModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeAlertModal();
  };

  const setData = (_data: string) => {
    _setData(_data);
  };

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
          <OkButton type="button" onClick={onCloseModal} data-testid="alert-modal-ok-button">
            확인
          </OkButton>
        </ButtonWrapper>
      </Container>
    </FullScreenModal>
  );
};

export default AlertModal;
