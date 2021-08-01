import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LikingUsersModal from "./components/molecules/LikingUsersModal";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./styles/GlobalStyles";
import { User } from "./types/user";

const Modal = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    window.addEventListener("message", ({ data: { type, data } }: MessageEvent) => {
      if (type !== POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) return;

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
