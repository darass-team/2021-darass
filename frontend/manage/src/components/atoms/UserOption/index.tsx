import { ReactNode } from "react";
import { Container, OptionContainer } from "./styles";
export interface Props {
  className?: string;
  children: ReactNode;
}

const UserOption = ({ className, children }: Props) => {
  return (
    <Container className={className}>
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;
