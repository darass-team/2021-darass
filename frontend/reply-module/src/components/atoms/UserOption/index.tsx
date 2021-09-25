import { ReactNode, useState } from "react";
import Modal from "../Modal";
import { Container, Label, OptionContainer } from "./styles";

export interface Props {
  className?: string;
  userName: string | undefined;
  children: ReactNode;
}

const UserOption = ({ className, userName, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} dimmedOpacity={0}>
      <Container className={className}>
        {!userName && <Label>Login with</Label>}
        <OptionContainer>{children}</OptionContainer>
      </Container>
    </Modal>
  );
};

export default UserOption;
