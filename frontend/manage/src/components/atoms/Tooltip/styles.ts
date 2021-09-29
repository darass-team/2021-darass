import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";

const Container = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 50%;
  border: 2px solid ${PALETTE.PRIMARY};
  position: relative;
  cursor: pointer;

  &::before {
    content: "?";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.8rem;
  }
`;

const Content = styled.span`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 0.3s ease-out fadeIn forwards;
  box-shadow: 1.04082px 1.04082px 6.24491px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, 50%);
  position: absolute;
  width: max-content;
  border-radius: 10px;
  background-color: ${PALETTE.GRAY_100};
  padding: 1rem 2rem;
  word-break: break-all;
  white-space: pre-wrap;
`;

export { Container, Content };
