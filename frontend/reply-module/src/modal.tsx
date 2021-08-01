import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LikingUsersModal from "./components/molecules/LikingUsersModal";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./styles/GlobalStyles";
import { User } from "./types/user";

const isValidMessageType = (type: string) =>
  [POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL, POST_MESSAGE_TYPE.CONFIRM].some(_type => _type === type);

const Modal = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    window.addEventListener("message", ({ data: { type, data } }: MessageEvent) => {
      if (!isValidMessageType(type)) return;

      setUsers(data);
    });
  }, []);

  return <LikingUsersModal users={users} />;
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <Modal />
  </>,
  document.getElementById("root")
);
