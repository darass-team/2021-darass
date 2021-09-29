import Alarm from "@/components/atoms/Alarm";
import Modal from "@/components/atoms/Modal";
import { GetAlarmResponse } from "@/types/comment";
import { useState } from "react";
import AlarmContent from "../AlarmContent";
import { Container, DropDownContainer } from "./styles";

export interface Props {
  alarmContents: GetAlarmResponse[];
  hasUnReadNotification?: boolean;
  onClick: () => void;
}

const AlarmDropDown = ({ alarmContents, hasUnReadNotification, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickAlarmIcon = () => {
    setIsOpen(state => !state);
    onClick();
  };

  return (
    <Container>
      <Alarm size="MD" hasUnReadNotification={hasUnReadNotification} onClick={onClickAlarmIcon} />

      <Modal isOpen={isOpen} blockScroll={false} closeModal={() => setIsOpen(false)} dimmedOpacity={0}>
        <DropDownContainer>
          <AlarmContent alarmContents={alarmContents} />
        </DropDownContainer>
      </Modal>
    </Container>
  );
};

export default AlarmDropDown;
