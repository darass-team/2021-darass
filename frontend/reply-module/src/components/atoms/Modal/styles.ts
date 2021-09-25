import styled from "styled-components";
import { PALETTE } from "../../../constants/styles/palette";

export const Dimmed = styled.div<{ isOpen: boolean; opacity: number }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 2rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
`;

export const RightContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  /* left: 0; */
  right: 0;
  width: 40%;
  /* position: absolute;
  top: 0;
  right: 0; */
  /* transform: translate(-50%, -50%); */

  /* padding: 3rem 2rem; */
  background-color: ${PALETTE.WHITE};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
`;
