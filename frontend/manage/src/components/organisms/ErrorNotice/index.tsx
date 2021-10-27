import { PNG } from "@/constants/clientAssets";
import { Container, TextArea, Img } from "./styles";

export interface Props {
  children: string;
  className?: string;
}

const ErrorNotice = ({ className, children }: Props) => {
  return (
    <Container className={className}>
      <Img src={PNG.LOGO} alt="다라쓰 로고" />
      <TextArea>
        <h2>Oops...</h2>
        <p>{children}</p>
      </TextArea>
    </Container>
  );
};

export default ErrorNotice;
