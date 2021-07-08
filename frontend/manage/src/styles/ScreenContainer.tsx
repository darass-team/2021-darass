import styled from "styled-components";
import { PALETTE } from "./palette";

const ScreenContainer = styled.div<{ bgColor: PALETTE }>`
  height: 100vh;
  width: 100%;
  background-color: ${[props => props.bgColor]};
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default ScreenContainer;
