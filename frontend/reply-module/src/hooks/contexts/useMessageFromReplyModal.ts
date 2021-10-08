import { createContext, useContext } from "react";

export const MessageChannelFromReplyModalContext = createContext<{
  clickedConfirmNo: () => void;
  clickedConfirmOk: () => void;
  closeAlertModal: () => void;
  closeConfirmModal: () => void;
  closeAlarmModal: () => void;
  closeLikingUserModal: () => void;
  receivedMessageFromReplyModule: MessageEvent["data"];
}>({
  clickedConfirmNo: () => console.error("Message channel port not initialized"),
  clickedConfirmOk: () => console.error("Message channel port not initialized"),
  closeAlertModal: () => console.error("Message channel port not initialized"),
  closeConfirmModal: () => console.error("Message channel port not initialized"),
  closeAlarmModal: () => console.error("Message channel port not initialized"),
  closeLikingUserModal: () => console.error("Message channel port not initialized"),
  receivedMessageFromReplyModule: null
});

export const useMessageChannelFromReplyModalContext = () => useContext(MessageChannelFromReplyModalContext);
