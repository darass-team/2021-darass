import { SVG } from "@/constants/clientAssets";
import { Container, LoadingImg } from "./styles";

const LoadingPage = () => {
  return (
    <Container>
      <LoadingImg src={SVG.LOADING} alt="로딩중" />
    </Container>
  );
};

export default LoadingPage;
