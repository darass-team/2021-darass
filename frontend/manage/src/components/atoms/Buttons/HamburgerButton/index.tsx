import { Container } from "./styles";

export interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton = ({ onClick, isOpen }: Props) => {
  return (
    <Container type="button" isOpen={isOpen} onClick={onClick}>
      <div />
      <div />
      <div />
    </Container>
  );
};

export default HamburgerButton;
