import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useState } from "react";
import FullScreenModal from "..";
import { ButtonWrapper, OkButton, Container, Message } from "./styles";

const AlertModal = () => {
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    setIsOpen(false);
    messageFromReplyModal(port).closeAlertModal();
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
