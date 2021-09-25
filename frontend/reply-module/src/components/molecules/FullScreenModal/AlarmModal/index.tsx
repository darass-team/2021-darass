import Modal from "@/components/atoms/Modal";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { postCloseAlarm } from "@/utils/postMessage";
import { useEffect, useState } from "react";
import AlarmContent, { AlarmContentType } from "../../AlarmContent";
import { Container, AlarmContainer } from "./styles";

const AlarmModal = () => {
  const [alarmContents, setAlarmContents] = useState<AlarmContentType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
    postCloseAlarm();
  };

  useEffect(() => {
    const onMessageAlarmModal = ({ data }: MessageEvent) => {
      if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.ALARM) {
        setIsOpen(false);

        return;
      }

      setAlarmContents(data.data);
      setIsOpen(true);
    };

    window.addEventListener("message", onMessageAlarmModal);

    return () => window.removeEventListener("message", onMessageAlarmModal);
  }, []);

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
