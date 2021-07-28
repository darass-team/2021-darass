import styled from "styled-components";
import { PALETTE } from "../../../../styles/palette";

export const Button = styled.button<{ isLiked: boolean }>`
  display: flex;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  background-color: ${PALETTE.WHITE};

  &:hover {
    background-color: ${PALETTE.GRAY_300};
  }

  &:hover > img {
    color: red;
  }

  & > span {
    padding-left: 0.5rem;
    font-weight: 700;
  }

  & > svg > path {
    fill: ${props => props.isLiked && `${PALETTE.BLUE_700}`};
  }
`;
