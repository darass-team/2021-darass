import { Container, TextArea, Img } from "./styles";
import logo from "../../../assets/svg/logo.svg";

const OopsNotice = () => {
  return (
    <Container>
      <Img src={logo} />
      <TextArea>
        <h2>Oops...</h2>
        <p>프로젝트를 불러오지 못했습니다. 잠시후에 다시 시도해주세요.</p>
      </TextArea>
    </Container>
  );
};

export default OopsNotice;
