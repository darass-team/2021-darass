import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { useState } from "react";
import AlarmContent from "@/components/@molecules/AlarmContent";
import FullScreenModal from "@/components/@molecules/FullScreenModal";
import { AlarmContainer, Container } from "./styles";

const AlarmModal = () => {
  const [data, _setData] = useState<GetAlarmResponse[]>();
  const [isOpen, setIsOpen] = useState(false);
  const { closeAlarmModal } = useMessageChannelFromReplyModalContext();

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    closeAlarmModal();
  };

  const setData = (_data: GetAlarmResponse[]) => {
    _setData(_data);
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.ALARM}
      fadeInFrom="right"
    >
      <Container data-testid="alarm-modal-container">
        <AlarmContainer>
          <AlarmContent alarmContents={data || []} />
        </AlarmContainer>
      </Container>
    </FullScreenModal>
  );
};

export default AlarmModal;
