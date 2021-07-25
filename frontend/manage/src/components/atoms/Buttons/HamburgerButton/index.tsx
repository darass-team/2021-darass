import { useState } from "react";
import { Container } from "./styles";

export interface Props {
  onClick: () => void;
}

const HamburgerButton = ({ onClick }: Props) => {
  const [open, setOpen] = useState(false);

  const onClickHamburger = () => {
    onClick();
    setOpen(state => !state);
  };

  return (
    <Container type="button" open={open} onClick={onClickHamburger}>
      <div />
      <div />
      <div />
    </Container>
  );
};

export default HamburgerButton;
