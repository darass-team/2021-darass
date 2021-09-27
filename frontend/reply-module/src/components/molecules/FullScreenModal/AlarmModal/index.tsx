import Modal from "@/components/atoms/Modal";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useEffect, useState } from "react";
import AlarmContent, { AlarmContentType } from "../../AlarmContent";
import { Container, AlarmContainer } from "./styles";

const AlarmModal = () => {
  const [alarmContents, setAlarmContents] = useState<AlarmContentType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    setIsOpen(false);
    messageFromReplyModal(port).closeAlarmModal();
  };

  const onMessageAlarmModal = ({ data }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.ALARM) {
      return;
    }

    setAlarmContents(data.data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (port) {
      port.removeEventListener("message", onMessageAlarmModal);
      port.addEventListener("message", onMessageAlarmModal);
      port.start();
    }
  }, [port]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} fadeInFrom="none">
      <Container isOpen={isOpen}>
        <AlarmContainer>
          <AlarmContent alarmContents={alarmContents} />
        </AlarmContainer>
      </Container>
    </Modal>
  );
};

export default AlarmModal;
