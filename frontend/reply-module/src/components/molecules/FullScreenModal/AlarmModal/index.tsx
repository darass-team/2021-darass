import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { useState } from "react";
import FullScreenModal from "..";
import AlarmContent from "../../AlarmContent";
import { AlarmContainer, Container } from "./styles";

const AlarmModal = () => {
  const [alarmContents, setAlarmContents] = useState<GetAlarmResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { closeAlarmModal } = useMessageChannelFromReplyModalContext();

  const onCloseModal = () => {
    closeAlarmModal();
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setAlarmContents}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.ALARM}
      fadeInFrom="right"
    >
      <Container>
        <AlarmContainer>
          <AlarmContent alarmContents={alarmContents} />
        </AlarmContainer>
      </Container>
    </FullScreenModal>
  );
};

export default AlarmModal;
