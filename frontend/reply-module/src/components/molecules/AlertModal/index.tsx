import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { useState } from "react";
import FullScreenModal from "../FullScreenModal";
import { ButtonWrapper, Container, Message, OkButton } from "./styles";

const AlertModal = () => {
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { closeAlertModal } = useMessageChannelFromReplyModalContext();

  const onCloseModal = () => {
    setIsOpen(false);
    closeAlertModal();
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setText}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.ALERT}
    >
      <Container>
        <Message>{text}</Message>
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
