import Kakao from "../../../assets/svg/kakao.svg";
import { MANAGE_PAGE_DOMAIN } from "../../../constants/domain";
import { OAUTH_ENDPOINT } from "../../../constants/oauth";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Logo from "../../atoms/Logo";
import { Container, Introduction, KakaoLoginButton } from "./styles";

const Login = () => {
  const moveKakaoOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.KAKAO}?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${MANAGE_PAGE_DOMAIN}/oauth/kakao`
    );
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
        <KakaoLoginButton onClick={moveKakaoOAuthURL}>
          <img src={Kakao} alt="kakao" />
          <span>카카오로 로그인</span>
        </KakaoLoginButton>
      </Container>
    </ScreenContainer>
  );
};

export default Login;
