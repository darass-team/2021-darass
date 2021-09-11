import naverLogo from "@/assets/png/naver.png";
import kakaoLogo from "@/assets/svg/kakao.svg";
import Logo from "@/components/atoms/Logo";
import { OAUTH_URL } from "@/constants/oauth";
import { PALETTE } from "@/styles/palette";
import ScreenContainer from "@/styles/ScreenContainer";
import { Container, Introduction, KakaoLoginButton, NaverLoginButton } from "./styles";

const Login = () => {
  const onLogin = (provider: keyof typeof OAUTH_URL) => {
    window.location.replace(OAUTH_URL[provider]);
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
        <KakaoLoginButton onClick={() => onLogin("KAKAO")}>
          <img src={kakaoLogo} alt="kakao login icon" />
          <span>카카오로 로그인</span>
        </KakaoLoginButton>
        <NaverLoginButton onClick={() => onLogin("NAVER")}>
          <img src={naverLogo} alt="naver login icon" />
          <span>네이버로 로그인</span>
        </NaverLoginButton>
      </Container>
    </ScreenContainer>
  );
};

export default Login;
