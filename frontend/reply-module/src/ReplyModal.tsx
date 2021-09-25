import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AlarmModal from "./components/molecules/AlarmModal";
import ConfirmModal from "./components/molecules/ConfirmModal";
import LikingUsersModal from "./components/molecules/LikingUsersModal";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { User } from "./types/user";

const isValidMessageType = (type: string) =>
  [
    POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL,
    POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM,
    POST_MESSAGE_TYPE.MODAL.OPEN.ALARM
  ].some(_type => _type === type);

const ReplyModal = () => {
  const [data, setData] = useState<{ type: string; data: any }>();

  useEffect(() => {
    window.addEventListener("message", ({ data }: MessageEvent) => {
      if (!isValidMessageType(data.type)) return;

      setData(data);
    });
  }, []);

  // 풀어야함
  if (data?.type === POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL)
    return <LikingUsersModal users={data.data as User[]} />;
  if (data?.type === POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM) return <ConfirmModal message={data.data as string} />;
  if (data?.type === POST_MESSAGE_TYPE.MODAL.OPEN.ALARM) return <AlarmModal />;

  return null;
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <ReplyModal />
  </>,
  document.getElementById("root")
);
