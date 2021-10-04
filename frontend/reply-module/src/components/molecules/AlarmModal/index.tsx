import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";
import AlarmContent from "../AlarmContent";
import FullScreenModal from "../FullScreenModal";
import { AlarmContainer, Container } from "./styles";
import { useAlarmModal } from "./useAlarmContent";

const AlarmModal = () => {
  const { isOpen, data, setData, openModal, onCloseModal } = useAlarmModal();

  return (
    <FullScreenModal
      isOpen={isOpen}
      openModal={openModal}
      setValue={setData}
      postCloseModal={onCloseModal}
      postType={POST_MESSAGE_TYPE.MODAL.OPEN.ALARM}
      fadeInFrom="right"
    >
      <Container>
        <AlarmContainer>
          <AlarmContent alarmContents={data || []} />
        </AlarmContainer>
      </Container>
    </FullScreenModal>
  );
};

export default AlarmModal;
