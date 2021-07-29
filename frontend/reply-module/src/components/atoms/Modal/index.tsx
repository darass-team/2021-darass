import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Container, Dimmed } from "./styles";

export interface Props {
  children: ReactNode;
}

const $modalRoot = document.getElementById("modal-root");

const Modal = ({ children }: Props) => {
  console.log($modalRoot);
  if (!$modalRoot) return null;

  return ReactDOM.createPortal(
    <Dimmed>
      <Container>{children}</Container>
    </Dimmed>,
    $modalRoot
  );
};

export default Modal;
