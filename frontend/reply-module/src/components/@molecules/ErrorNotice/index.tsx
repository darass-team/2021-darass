import { Container, TextArea, Img } from "./styles";
import logo from "@/assets/png/logo.png";

export interface Props {
  children: string;
}

const ErrorNotice = ({ children, ...props }: Props) => {
  return (
    <Container {...props}>
      <Img src={logo} alt="error message" />
      <TextArea>
        <h2>Oops...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
