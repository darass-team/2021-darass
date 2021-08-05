import styled from "styled-components";
import { Z_INDEX } from "../../../styles/constants";

export const Dimmed = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => (props.isOpen ? Z_INDEX.MODAL : -1)};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: all 0.5s;
`;

export const Container = styled.div<{ isOpen: boolean }>`
  & > * {
    z-index: ${props => (props.isOpen ? Z_INDEX.MODAL + 1 : -1)};
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transition: all 0.1s;
  }
`;
