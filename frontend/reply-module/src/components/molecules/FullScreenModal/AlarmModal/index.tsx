import Modal from "@/components/atoms/Modal";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { postCloseAlarm } from "@/utils/postMessage";
import { useEffect, useState } from "react";
import AlarmContent, { AlarmContentType } from "../../AlarmContent";
import { Container, AlarmContainer } from "./styles";

const AlarmModal = () => {
  const [alarmContents, setAlarmContents] = useState<AlarmContentType[] | null>(null);

  const onCloseModal = () => {
    setAlarmContents(null);
    postCloseAlarm();
  };

  useEffect(() => {
    const onMessageAlarmModal = ({ data }: MessageEvent) => {
      if (data.type !== POST_MESSAGE_TYPE.MODAL.OPEN.ALARM) return;

      setAlarmContents(data.data);
    };

    window.addEventListener("message", onMessageAlarmModal);

    return () => window.removeEventListener("message", onMessageAlarmModal);
  }, []);

  return (
    <Container>
      <Modal isOpen={!!alarmContents} closeModal={onCloseModal}>
        <AlarmContainer>
          <AlarmContent alarmContents={alarmContents || []} />
        </AlarmContainer>
      </Modal>
    </Container>
  );
};

export default AlarmModal;
