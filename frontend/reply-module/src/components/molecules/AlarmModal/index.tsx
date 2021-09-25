import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import AlarmContent from "../AlarmContent";
import { Container } from "./styles";

const AlarmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickAlarmIcon = () => {
    setIsOpen(state => !state);
  };

  return (
    <Container>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
          <AlarmContent alarmContents={[]} />
        </Modal>
      )}
    </Container>
  );
};

export default AlarmModal;
