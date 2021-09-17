import { Container, LoadingImg } from "./styles";
import loadingSVG from "../../../assets/svg/loading.svg";

const LoadingPage = () => {
  return (
    <Container>
      <LoadingImg src={loadingSVG} alt="로딩중" />
    </Container>
  );
};

export default LoadingPage;
