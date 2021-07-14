import { ReactNode } from "react";
import { Container, Label, OptionContainer } from "./styles";

export interface Props {
  className?: string;
  userName: string;
  children: ReactNode;
}

const UserOption = ({ className, userName, children }: Props) => {
  return (
    <Container className={className}>
      <Label>{userName ? userName : "Login with"}</Label>
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;
