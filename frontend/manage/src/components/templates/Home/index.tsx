import Logo from "../../atoms/Logo";
import { Container, Introduction, Button } from "./styles";

export interface Props {
  moveLoginPage: () => void;
}

const Home = ({ moveLoginPage }: Props) => {
  return (
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
  );
};

export default Home;
