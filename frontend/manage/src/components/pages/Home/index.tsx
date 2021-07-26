import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Logo from "../../atoms/Logo";
import { Container, Introduction, Button } from "./styles";

const Home = () => {
  const history = useHistory();

  const moveLoginPage = () => {
    history.push(ROUTE.LOGIN);
  };

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Container>
        <h1>
          <Logo size="LG" />
        </h1>
        <Introduction>
          댓글 다라쓰,
          <br />
          블로그에 다라쓰
        </Introduction>
        <Button type="button" onClick={moveLoginPage}>
          Get Started
        </Button>
      </Container>
    </ScreenContainer>
  );
};

export default Home;
