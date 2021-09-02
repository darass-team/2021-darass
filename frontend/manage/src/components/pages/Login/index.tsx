import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Github from "../../../assets/svg/github.svg";
import Kakao from "../../../assets/svg/kakao.svg";
import { ROUTE } from "../../../constants";
import { OAUTH_ENDPOINT } from "../../../constants/oauth";
import { useUser } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import { AlertError } from "../../../utils/error";
import Logo from "../../atoms/Logo";
import { Container, GithubLoginButton, Introduction, KakaoLoginButton } from "./styles";

const Login = () => {
  const { login } = useUser();
  const history = useHistory();
  const location = useLocation();

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

  const moveGithubOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.GITHUB}?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3001${ROUTE.OAUTH}/github`
    );
  };

  const moveKakaoOAuthURL = () => {
    window.location.replace(
      `${OAUTH_ENDPOINT.KAKAO}?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3001${ROUTE.OAUTH}/kakao`
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
        <GithubLoginButton onClick={moveGithubOAuthURL}>
          <img src={Github} alt="Github" />
          <span>깃허브로 로그인</span>
        </GithubLoginButton>
      </Container>
    </ScreenContainer>
  );
};

export default Login;
