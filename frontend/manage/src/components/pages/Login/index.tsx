import loginPageBackground from "@/assets/png/loginpage_background.png";
import naverLogo from "@/assets/png/naver.png";
import kakaoLogo from "@/assets/svg/kakao.svg";
import { OAUTH_URL } from "@/constants/oauth";
import { useScrollFadeInOut } from "@/hooks";
import ScreenContainer from "@/components/@style/ScreenContainer";
import { Container, SectionContainer, KakaoLoginButton, MainText, NaverLoginButton } from "./styles";

const Login = () => {
  const animationRefs = {
    introductionText: useScrollFadeInOut({
      direction: "up",
      duration: 1,
      delay: 0
    }),
    kakaoLoginButton: useScrollFadeInOut({
      direction: "right",
      duration: 1,
      delay: 0
    }),
    naverLoginButton: useScrollFadeInOut({
      direction: "left",
      duration: 1,
      delay: 0
    })
  };

  const onLogin = (provider: keyof typeof OAUTH_URL) => {
    window.location.replace(OAUTH_URL[provider]);
  };

  return (
    <SectionContainer bgImage={loginPageBackground}>
      <Container>
        <MainText {...animationRefs.introductionText}>
          반갑습니다
          <br />
          로그인 방식을 선택해주세요
        </MainText>

        <KakaoLoginButton onClick={() => onLogin("KAKAO")} {...animationRefs.kakaoLoginButton}>
          <img src={kakaoLogo} alt="kakao login icon" />
          <span>카카오로 로그인</span>
        </KakaoLoginButton>
        <NaverLoginButton onClick={() => onLogin("NAVER")} {...animationRefs.naverLoginButton}>
          <img src={naverLogo} alt="naver login icon" />
          <span>네이버로 로그인</span>
        </NaverLoginButton>
      </Container>
    </SectionContainer>
  );
};

export default Login;
