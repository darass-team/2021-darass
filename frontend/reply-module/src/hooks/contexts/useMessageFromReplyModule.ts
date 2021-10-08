import { GetAlarmResponse, Comment } from "@/types/comment";
import { createContext, useContext } from "react";

export const MessageChannelFromReplyModuleContext = createContext<{
  setScrollHeight: () => void;
  openAlert: (message: string) => void;
  openConfirmModal: (message: string) => Promise<"yes" | "no">;
  openAlarmModal: (alarmContents: GetAlarmResponse[]) => void;
  openLikingUserModal: (users: Comment["user"][]) => void;
  receivedMessageFromReplyModal: MessageEvent["data"];
}>({
  setScrollHeight: () => console.error("Message channel port not initialized"),
  openAlert: (message: string) => console.error("Message channel port not initialized"),
  openConfirmModal: async (message: string) => {
    console.error("Message channel port not initialized");
    return "no";
  },
  openAlarmModal: (alarmContents: GetAlarmResponse[]) => console.error("Message channel port not initialized"),
  openLikingUserModal: (users: Comment["user"][]) => console.error("Message channel port not initialized"),
  receivedMessageFromReplyModal: null
});

export const useMessageChannelFromReplyModuleContext = () => useContext(MessageChannelFromReplyModuleContext);
