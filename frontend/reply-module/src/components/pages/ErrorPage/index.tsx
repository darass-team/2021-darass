import { Container, ErrorNotice } from "./styles";

interface Props {
  notice: string;
}

const ErrorPage = ({ notice }: Props) => {
  return (
    <Container>
      <ErrorNotice>{notice}</ErrorNotice>
    </Container>
  );
};

export default ErrorPage;
