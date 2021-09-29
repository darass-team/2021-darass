import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { GetAlarmResponse } from "@/types/comment";
import { messageFromReplyModal } from "@/utils/postMessage";
import { useContext, useState } from "react";
import FullScreenModal from "..";
import AlarmContent from "../../AlarmContent";
import { AlarmContainer, Container } from "./styles";

const AlarmModal = () => {
  const [alarmContents, setAlarmContents] = useState<GetAlarmResponse[]>([]);
  const { port } = useContext(MessageChannelContext);

  const onCloseModal = () => {
    messageFromReplyModal(port).closeAlarmModal();
  };

  return (
    <FullScreenModal
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
