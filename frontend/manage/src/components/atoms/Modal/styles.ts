import styled from "styled-components";
import { Z_INDEX } from "../../../styles/constants";

export const Dimmed = styled.div<{ isOpen: boolean; opacity: number }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ isOpen }) => (isOpen ? Z_INDEX.MODAL : -1)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: z-index 1s, opacity 0.5s;
`;
