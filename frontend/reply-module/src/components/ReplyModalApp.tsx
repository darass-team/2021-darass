import AlarmModal from "./@organisms/AlarmModal";
import AlertModal from "./@organisms/AlertModal";
import ConfirmModal from "./@organisms/ConfirmModal";
import LikingUsersModal from "./@organisms/LikingUsersModal";
import LoadingPage from "./@molecules/LoadingPage";
import { MessageChannelFromReplyModalContext } from "../hooks/contexts/useMessageFromReplyModal";
import { useReplyModalApp } from "./useReplyModalApp";
import { messageFromReplyModal } from "../utils/postMessage";

const App = () => {
  const { port, receivedMessageFromReplyModule } = useReplyModalApp();

  if (!port) {
    return <LoadingPage />;
  }

  return (
    <MessageChannelFromReplyModalContext.Provider
      value={{
        clickedConfirmNo: messageFromReplyModal(port).clickedConfirmNo,
        clickedConfirmOk: messageFromReplyModal(port).clickedConfirmOk,
        closeAlertModal: messageFromReplyModal(port).closeAlertModal,
        closeConfirmModal: messageFromReplyModal(port).closeConfirmModal,
        closeAlarmModal: messageFromReplyModal(port).closeAlarmModal,
        closeLikingUserModal: messageFromReplyModal(port).closeLikingUserModal,
        receivedMessageFromReplyModule
      }}
    >
      <LikingUsersModal />
      <ConfirmModal />
      <AlarmModal />
      <AlertModal />
    </MessageChannelFromReplyModalContext.Provider>
  );
};

export default App;
