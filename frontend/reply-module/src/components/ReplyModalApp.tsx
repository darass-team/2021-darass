import { PALETTE } from "@/constants/styles/palette";
import { ThemeProvider } from "styled-components";
import { MessageChannelFromReplyModalContext } from "../hooks/contexts/useMessageFromReplyModal";
import { messageFromReplyModal } from "../utils/postMessage";
import LoadingPage from "./@molecules/LoadingPage";
import AlarmModal from "./@organisms/AlarmModal";
import AlertModal from "./@organisms/AlertModal";
import ConfirmModal from "./@organisms/ConfirmModal";
import LikingUsersModal from "./@organisms/LikingUsersModal";
import { useReplyModalApp } from "./useReplyModalApp";

const getReplyModalParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const primaryColor = decodeURIComponent(urlParams.get("primaryColor") || PALETTE.PRIMARY);

  return {
    primaryColor
  };
};

const App = () => {
  const { primaryColor } = getReplyModalParams();

  const { port, receivedMessageFromReplyModule } = useReplyModalApp();

  if (!port) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={{ primaryColor }}>
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
    </ThemeProvider>
  );
};

export default App;
