import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ConfirmModal from "./components/molecules/ConfirmModal";
import LikingUsersModal from "./components/molecules/LikingUsersModal";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { User } from "./types/user";

const isValidMessageType = (type: string) =>
  [POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL, POST_MESSAGE_TYPE.OPEN_CONFIRM].some(_type => _type === type);

const Modal = () => {
  const [data, setData] = useState<{ type: string; data: any }>();

  useEffect(() => {
    window.addEventListener("message", ({ data }: MessageEvent) => {
      if (!isValidMessageType(data.type)) return;

      if (POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) setData(data);
      if (POST_MESSAGE_TYPE.OPEN_CONFIRM) setData(data);
    });
  }, []);

  if (data?.type === POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) return <LikingUsersModal users={data.data as User[]} />;
  if (data?.type === POST_MESSAGE_TYPE.OPEN_CONFIRM) return <ConfirmModal message={data.data as string} />;

  return null;
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <Modal />
  </>,
  document.getElementById("root")
);
