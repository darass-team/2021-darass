import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import AlarmContent, { AlarmContentType } from "../AlarmContent";
import { Container } from "./styles";

export interface Props {
  alarmContents: AlarmContentType[];
  direction?: "bottom" | "right";
}

const AlarmModal = ({ alarmContents, direction = "right" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickAlarmIcon = () => {
    setIsOpen(state => !state);
  };

  return (
    <Container>
      <Alarm size="MD" hasUnReadNotification={false} onClick={onClickAlarmIcon} />
      {isOpen && (
        <Modal direction={direction}>
          <AlarmContent alarmContents={[]} />
        </Modal>
      )}
    </Container>
  );
};

export default AlarmModal;
