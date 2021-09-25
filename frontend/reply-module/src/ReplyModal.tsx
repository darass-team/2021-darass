import ReactDOM from "react-dom";
import AlarmModal from "./components/molecules/FullScreenModal/AlarmModal";
import ConfirmModal from "./components/molecules/FullScreenModal/ConfirmModal";
import LikingUsersModal from "./components/molecules/FullScreenModal/LikingUsersModal";
import GlobalStyles from "./constants/styles/GlobalStyles";

const ReplyModal = () => {
  return (
    <>
      <LikingUsersModal />
      <ConfirmModal />
      <AlarmModal />
    </>
  );
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <ReplyModal />
  </>,
  document.getElementById("root")
);
