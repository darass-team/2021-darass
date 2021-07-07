import Logo from "../../atoms/Logo";
import { Container, Introduction, Button } from "./styles";

const Home = () => {
  return (
    <Container>
      <h1><Logo size="LG" /></h1>
      <Introduction>댓글 다라쓰,<br />블로그에 다라쓰</Introduction>
      <Button>Get Started</Button>
    </Container>
  );
};

export default Home;
