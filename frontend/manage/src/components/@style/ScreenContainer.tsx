import styled from "styled-components";
import { NAVIGATION_HEIGHT, PAGE_MAX_WIDTH } from "../../constants/styles/constants";
import { PALETTE } from "../../constants/styles/palette";

const ScreenContainer = styled.div<{ bgColor?: PALETTE; bgImage?: string }>`
  overflow: hidden;

  min-height: ${`calc(100vh - ${NAVIGATION_HEIGHT})`};
  background-color: ${props => (props.bgColor ? props.bgColor : PALETTE.DEFAULT_BG)};
  background-image: ${props =>
    props.bgImage && `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${props.bgImage})`};

  ${props => props.bgImage && "background-size: cover"};

  padding: 4rem 2.5rem;

  & > * {
    max-width: ${PAGE_MAX_WIDTH};
    margin: 0 auto;
  }

  @media (max-width: 780px) {
    min-height: 100vh;
    padding: 7rem 2.5rem;
  }
`;

export default ScreenContainer;
