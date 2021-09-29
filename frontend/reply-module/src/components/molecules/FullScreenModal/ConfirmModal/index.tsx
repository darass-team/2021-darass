import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useState } from "react";
import FullScreenModal from "..";
import { ButtonWrapper, CancelButton, ConfirmButton, Container, Message } from "./styles";

const ConfirmModal = () => {
  const [text, setText] = useState<string>("");
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    messageFromReplyModal(port).closeConfirmModal();
  };

  const onClickConfirmOk = () => {
    messageFromReplyModal(port).clickedConfirmOk();
  };

  return (
    <FullScreenModal setValue={setText} postCloseModal={onCloseModal} postType={POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM}>
      <Container>
        <Message>{text}</Message>
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
