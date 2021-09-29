import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";

const Container = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 3%;
  left: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ isOpen }) => (isOpen ? 3 : 1)};

  div {
    width: 3rem;
    height: 5px;
    background-color: ${PALETTE.BLACK_700};
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 18% 50%;

    :first-child {
      transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
      transform: ${({ isOpen }) => (isOpen ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export { Container };
