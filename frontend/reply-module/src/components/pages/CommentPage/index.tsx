import { useLogin } from "../../../hooks";
import CommentArea from "../../templates/CommentArea";

const CommentPage = () => {
  const { user, login, logout } = useLogin();

  return <CommentArea user={user} onLogin={login} onLogout={logout} />;
};

export default CommentPage;
