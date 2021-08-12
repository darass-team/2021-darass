import { ReactNode } from "react";
import { Container, Dimmed } from "./styles";

export interface Props {
  children: ReactNode;
  className?: string;
}

const Modal = ({ children, className }: Props) => {
  const onCloseModal = () => {
    window.parent.postMessage({ type: "closeModal" }, "*");
  };

  return (
    <>
      <Dimmed onClick={onCloseModal}></Dimmed>
      <Container className={className}>{children}</Container>
    </>
  );
};

export default Modal;
