import { PNG, SVG } from "@/constants/clientAssets";
import { OAUTH_URL } from "@/constants/oauth";
import { useDocumentTitle, useScrollFadeInOut } from "@/hooks";
import { Container, KakaoLoginButton, MainText, NaverLoginButton, SectionContainer } from "./styles";

const Login = () => {
  useDocumentTitle("로그인");
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
    <SectionContainer bgImage={PNG.LOGIN_PAGE_BACKGROUND}>
      <Container>
        <MainText {...animationRefs.introductionText}>
          반갑습니다
          <br />
          로그인 방식을 선택해주세요
        </MainText>

        <KakaoLoginButton onClick={() => onLogin("KAKAO")} {...animationRefs.kakaoLoginButton}>
          <img src={SVG.KAKAO} alt="kakao login icon" />
          <span>카카오로 로그인</span>
        </KakaoLoginButton>
        <NaverLoginButton onClick={() => onLogin("NAVER")} {...animationRefs.naverLoginButton}>
          <img src={PNG.NAVER_LOGO} alt="naver login icon" />
          <span>네이버로 로그인</span>
        </NaverLoginButton>
      </Container>
    </SectionContainer>
  );
};

export default Login;
