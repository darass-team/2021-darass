import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Dimmed = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.BLACK_900};
  opacity: 0.4;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 3rem 2rem;
  transform: translate(-50%, -50%);
  background-color: ${PALETTE.WHITE};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
`;
