import { Container, TextArea, Img } from "./styles";
import { PNG } from "@/constants/clientAssets";

export interface Props {
  children: string;
}

const ErrorNotice = ({ children, ...props }: Props) => {
  return (
    <Container {...props}>
      <Img src={PNG.LOGO} alt="error message" />
      <TextArea>
        <h2>Oops...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
