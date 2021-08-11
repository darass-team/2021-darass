import { useHistory } from "react-router";
import Kakao from "../../../assets/svg/kakao.svg";
import { ROUTE } from "../../../constants";
import { useUser } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import { AlertError } from "../../../utils/error";
import Logo from "../../atoms/Logo";
import { Button, Container, Introduction } from "./styles";

const Login = () => {
  const { login } = useUser();
  const history = useHistory();

  const onLogin = async () => {
    try {
      await login();

      history.push(ROUTE.MY_PROJECT);
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Container>
        <Introduction>
          댓글 다라쓰,
          <br />
          블로그에 다라쓰
        </Introduction>
        <Logo size="LG" />
        <Button onClick={onLogin}>
          <img src={Kakao} alt="kakao" />
          <span>카카오로 1초만에 시작하기</span>
        </Button>
      </Container>
    </ScreenContainer>
  );
};

export default Login;
