import styled from "styled-components";
import { navigationHeight, pageMaxWidth } from "./constants";
import { PALETTE } from "./palette";

const ScreenContainer = styled.div<{ bgColor?: PALETTE }>`
  min-height: ${`calc(100vh - ${navigationHeight})`};
  width: 100%;
  max-width: ${pageMaxWidth};
  background-color: ${[props => (props.bgColor ? props.bgColor : PALETTE.WHITE)]};
  padding: 5rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default ScreenContainer;
