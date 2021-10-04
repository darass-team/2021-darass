import styled, { css } from "styled-components";
import { PALETTE } from "@/constants/styles/palette";
import CancelButtonComponent from "@/components/atoms/CancelButton";

export const Container = styled.div<{ isSubComment: boolean }>`
  width: 100%;

  background-color: ${props => (props.isSubComment ? PALETTE.GRAY_300 : PALETTE.GRAY_100)};
  border-radius: 10px;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;

  transition: all 0.3s linear;
`;

export const Name = styled.span<{ thisCommentIsWrittenByAdmin: boolean }>`
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.65rem;
  margin-bottom: 0.2rem;
  margin-right: 2rem;

  ${props =>
    props.thisCommentIsWrittenByAdmin &&
    css`
      &:after {
        content: "운영자";
        font-size: 0.9rem;
        line-height: 1.35rem;
        margin-left: 0.3rem;
        color: ${PALETTE.INDIGO_600};
      }
    `}
`;

export const Text = styled.div<{ isSubComment: boolean; contentEditable: boolean }>`
  outline-color: ${PALETTE.BLACK_700};
  background-color: ${props => {
    if (props.contentEditable) {
      return PALETTE.WHITE;
    }
    if (props.isSubComment) {
      return PALETTE.GRAY_300;
    }

    return PALETTE.GRAY_100;
  }};
  padding: 0.2rem 0.3rem 0.2rem 0.1rem;
  min-width: 14rem;
  border-radius: 0.3rem;
  word-break: break-all;
  white-space: break-spaces;
  font-size: 1.2rem;
  line-height: 1.8rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  margin-left: auto;

  & > button {
    padding: 0;
    width: 4rem;
    height: 2.4rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 10px;
    margin-top: 1rem;
  }
`;

export const CancelButton = styled(CancelButtonComponent)`
  margin-right: 0.3rem;
`;
