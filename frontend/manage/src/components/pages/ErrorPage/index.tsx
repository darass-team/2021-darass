import ScreenContainer from "@/components/@style/ScreenContainer";
import { Container, ErrorNotice } from "./styles";

interface Props {
  notice: string;
}

const ErrorPage = ({ notice }: Props) => {
  return (
    <ScreenContainer>
      <Container>
        <ErrorNotice>{notice}</ErrorNotice>
      </Container>
    </ScreenContainer>
  );
};

export default ErrorPage;
