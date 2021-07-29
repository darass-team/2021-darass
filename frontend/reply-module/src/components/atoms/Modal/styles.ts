import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  padding: 2rem 1rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
`;
