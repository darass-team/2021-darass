import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../constants/styles/constants";
import { PALETTE } from "../../../constants/styles/palette";

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentMeta = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.span<{ isMyComment: boolean }>`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  margin-right: 1rem;
  color: ${PALETTE.SECONDARY};

  &::after {
    content: "*";
    color: ${PALETTE.TEAL_700};
    display: ${({ isMyComment }) => (isMyComment ? "" : "none")};
  }
`;

export const Content = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin: 0.5rem 0;
  word-break: break-all;
  white-space: break-spaces;
`;

export const Url = styled.a`
  color: ${PALETTE.GRAY_500};
`;

export const SecretIcon = styled.span`
  margin-left: 0.5rem;
`;
