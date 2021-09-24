import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import AlarmContent, { AlarmContentType } from "../AlarmContent";
import { Container, DropDownContainer } from "./styles";

export interface Props {
  alarmContents: AlarmContentType[];
}

const AlarmDropDown = ({ alarmContents }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickAlarmIcon = () => {
    setIsOpen(state => !state);
  };

  return (
    <Container>
      <Alarm size="MD" hasUnReadNotification={false} onClick={onClickAlarmIcon} />
      {isOpen && (
        <Modal isOpen={isOpen} blockScroll={false} closeModal={() => setIsOpen(false)} dimmedOpacity={0}>
          <DropDownContainer>
            <AlarmContent alarmContents={alarmContents} />
          </DropDownContainer>
        </Modal>
      )}
    </Container>
  );
};

export default AlarmDropDown;
