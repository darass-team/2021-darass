import styled from "styled-components";
import { navigationHeight, pageMaxWidth } from "./constants";
import { PALETTE } from "./palette";

const ScreenContainer = styled.div<{ bgColor?: PALETTE }>`
  min-height: ${`calc(100vh - ${navigationHeight})`};
  width: 100%;
  background-color: ${[props => (props.bgColor ? props.bgColor : PALETTE.WHITE)]};
  padding: 7rem 2.5rem;
  overflow: scroll;
`;

export default ScreenContainer;
