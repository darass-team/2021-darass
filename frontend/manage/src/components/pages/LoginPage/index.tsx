import { useUser } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Login from "../../templates/Login";

const LoginPage = () => {
  const { login } = useUser();

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Login onLoginWithKakao={login} />
    </ScreenContainer>
  );
};

export default LoginPage;
