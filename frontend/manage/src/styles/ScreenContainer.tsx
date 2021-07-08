import styled from "styled-components";
import { navigationHeight } from "./constants";
import { PALETTE } from "./palette";

const ScreenContainer = styled.div<{ bgColor: PALETTE }>`
  min-height: ${`calc(100vh - ${navigationHeight})`};
  width: 100%;
  background-color: ${[props => props.bgColor]};
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default ScreenContainer;
