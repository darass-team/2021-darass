import { Container, TextArea, Img } from "./styles";
import logo from "../../../assets/svg/logo.svg";

export interface Props {
  children: string;
  className?: string;
}

const ErrorNotice = ({ className, children }: Props) => {
  return (
    <Container className={className}>
      <Img src={logo} alt="다라쓰 로고" />
      <TextArea>
        <h2>Oops...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
