import styled from "styled-components";
import { NAVIGATION_HEIGHT, PAGE_MAX_WIDTH } from "./constants";
import { PALETTE } from "./palette";

const ScreenContainer = styled.div<{ bgColor?: PALETTE }>`
  min-height: ${`calc(100vh - ${NAVIGATION_HEIGHT})`};
  width: 100%;
  background-color: ${[props => (props.bgColor ? props.bgColor : PALETTE.DEFAULT_BG)]};
  padding: 4rem 2.5rem;
  & > * {
    max-width: ${PAGE_MAX_WIDTH};
    margin: 0 auto;
  }
`;

export default ScreenContainer;
