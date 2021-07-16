import { useUser } from "../../../hooks";
import Login from "../../templates/Login";

const LoginPage = () => {
  const { login } = useUser();

  return <Login onLoginWithKakao={login} />;
};

export default LoginPage;
