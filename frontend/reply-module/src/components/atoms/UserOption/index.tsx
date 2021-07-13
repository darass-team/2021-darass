import { ReactNode } from "react";
import { Container, Label, OptionContainer } from "./styles";

export interface Props {
  userName: string;
  children: ReactNode;
}

const UserOption = ({ userName, children }: Props) => {
  return (
    <Container>
      <Label>{userName ? userName : "Login with"}</Label>
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;
