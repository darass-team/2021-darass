import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { useState } from "react";
import FullScreenModal from "@/components/@molecules/FullScreenModal";
import { ButtonWrapper, CancelButton, ConfirmButton, Container, Message } from "./styles";

const ConfirmModal = () => {
  const [data, _setData] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeConfirmModal, clickedConfirmOk } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeConfirmModal();
  };

  const setData = (_data: string) => {
    _setData(_data);
  };

  const onClickConfirmOk = () => {
    setIsOpen(false);
    clickedConfirmOk();
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM}
    >
      <Container data-testid="confirm-modal-container">
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
