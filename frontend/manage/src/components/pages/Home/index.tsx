import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useScrollFadeIn } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Logo from "../../atoms/Logo";
import { Button, Container, Introduction, P } from "./styles";

const Home = () => {
  const history = useHistory();
  const animation = {
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

          <Introduction {...animation.introductionText}>
            댓글 다라쓰,
            <br />
            블로그에 다라쓰
          </Introduction>

          <Button type="button" onClick={moveLoginPage} {...animation.startButton}>
            Get Started
          </Button>
        </Container>
      </ScreenContainer>

      <ScreenContainer bgColor={PALETTE.WHITE}>
        <Container>
          <P>블로그에 댓글을 달고 싶으신가요?</P>
        </Container>
      </ScreenContainer>
    </>
  );
};

export default Home;
