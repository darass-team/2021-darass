import { ReactNode } from "react";
import { Container, OptionContainer } from "./styles";

export interface Props {
  children: ReactNode;
}

const UserOption = ({ children, ...props }: Props) => {
  return (
    <Container data-testid="userOption" {...props}>
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;
