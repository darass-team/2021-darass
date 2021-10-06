import AlarmModal from "./molecules/AlarmModal";
import AlertModal from "./molecules/AlertModal";
import ConfirmModal from "./molecules/ConfirmModal";
import LikingUsersModal from "./molecules/LikingUsersModal";
import LoadingPage from "./organisms/LoadingPage";
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
