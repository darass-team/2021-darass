import { ReactNode } from "react";
import { Container, Label, OptionContainer } from "./styles";

export interface Props {
  className?: string;
  userName: string | undefined;
  children: ReactNode;
}

const UserOption = ({ className, userName, children }: Props) => {
  return (
    <Container className={className}>
      {!userName && <Label>Login with</Label>}
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;
