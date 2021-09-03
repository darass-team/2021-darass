import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useScrollFadeIn } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Logo from "../../atoms/Logo";
import { Button, Container, MainText, Text, ScrollDownTrigger, SectionContainer } from "./styles";
import scrollDownButton from "../../../assets/svg/scroll-down.svg";

const Home = () => {
  const history = useHistory();
  const animation = {
    section1: {
      introductionText: useScrollFadeIn({
        direction: "up",
        duration: 1,
        delay: 0
      }),
      startButton: useScrollFadeIn({
        direction: "up",
        duration: 1,
        delay: 0.3
      })
    },
    section2: {
      questionText: useScrollFadeIn({ direction: "up", duration: 1, delay: 0, threshold: 0.5 })
    }
  };

  const moveLoginPage = () => {
    history.push(ROUTE.LOGIN);
  };

  return (
    <>
      <ScreenContainer bgColor={PALETTE.PRIMARY}>
        <Container>
          <h1>
            <Logo size="LG" />
          </h1>

          <MainText {...animation.section1.introductionText}>
            댓글의 모든것,
            <br />
            다라쓰에서 쉽고 간편하게
          </MainText>

          <Button type="button" onClick={moveLoginPage} {...animation.section1.startButton}>
            Get Started
          </Button>
        </Container>

        <ScrollDownTrigger href="#section2">
          <img src={scrollDownButton} width="100px" height="100px" />
        </ScrollDownTrigger>
      </ScreenContainer>

      <SectionContainer id="section2" bgColor={PALETTE.WHITE}>
        <Container {...animation.section2.questionText}>
          <Text color={PALETTE.BLACK_700} fontSize={2}>
            내 모든 댓글 내역을 한눈에 조회하고 한 곳에서 관리하세요.
            <br />
            이제껏 경험 못 했던 쉽고 편리한 댓글 서비스,
            <br /> 다라쓰와 함께라면 당신의 일상이 새로워질 거예요.
          </Text>
        </Container>
      </SectionContainer>
    </>
  );
};

export default Home;
