import { Container, TextArea, Img } from "./styles";
import logo from "../../../assets/svg/darass-logo.svg";

export interface Props {
  children: string;
  className?: string;
}

const ErrorNotice = ({ className, children }: Props) => {
  return (
    <Container className={className}>
      <Img src={logo} />
      <TextArea>
        <h2>Oops...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
