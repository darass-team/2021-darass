import Kakao from "../../../assets/svg/kakao.svg";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Logo from "../../atoms/Logo";
import { Button, Container, Introduction } from "./styles";

export interface Props {
  onLoginWithKakao: () => void;
}

const Login = ({ onLoginWithKakao }: Props) => {
  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Container>
        <Introduction>
          댓글 다라쓰,
          <br />
          블로그에 다라쓰
        </Introduction>
        <Logo size="LG" />
        <Button onClick={onLoginWithKakao}>
          <img src={Kakao} alt="kakao" />
          <span>카카오로 1초만에 시작하기</span>
        </Button>
      </Container>
    </ScreenContainer>
  );
};

export default Login;
