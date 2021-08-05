import styled from "styled-components";
import { Z_INDEX } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

export const Dimmed = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: ${Z_INDEX.MODAL};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEX.MODAL + 1};
`;
