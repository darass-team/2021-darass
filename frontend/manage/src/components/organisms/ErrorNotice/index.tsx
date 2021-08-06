import { Container, TextArea, Img } from "./styles";
import logo from "../../../assets/svg/logo.svg";

export interface Props {
  children: string;
}

const ErrorNotice = ({ children }: Props) => {
  return (
    <Container>
      <Img src={logo} />
      <TextArea>
        <h2>이런...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
