import { PALETTE } from "@/constants/styles/palette";
import styled, { css } from "styled-components";
import { InputCSS } from "@/constants/styles/css";

export const Form = styled.form<{ isSubCommentInput: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => (props.isSubCommentInput ? "2rem" : "1rem")};
`;

export const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TextBox = styled.textarea<{ isValidInput: boolean }>`
  ${InputCSS};
  width: 100%;
  ${props =>
    !props.isValidInput &&
    css`
      border-color: ${PALETTE.RED_600};
      box-shadow: 0 0 0 1px ${PALETTE.RED_600};
      &: focus {
        box-shadow: 0 0 0 1px ${PALETTE.RED_600};
      }
    `}
  padding: 1rem 0.8rem;
  min-height: 6rem;
  height: fit-content;
  max-height: 12rem;
  margin-bottom: 0.2rem;
  word-break: break-all;
  white-space: break-spaces;
  overflow-y: auto;

  color: ${PALETTE.BLACK_700};
  resize: vertical;
`;

export const TextInfoWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  padding: 0 0.6rem;
  align-items: center;
  justify-content: space-between;
`;

export const TextCount = styled.span`
  font-size: 1.1rem;
  line-height: 1.65rem;
  margin-right: 0.6rem;
  color: ${({ theme: { isDarkModePage } }) => isDarkModePage && PALETTE.WHITE};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GuestInfo = styled.input<{ isValidInput: boolean; isSubCommentInput: boolean }>`
  ${InputCSS};
  padding: 1rem 0.8rem;
  background: transparent;
  width: 8rem;
  &:first-child {
    margin-right: 1.2rem;
  }

  ${props =>
    !props.isValidInput &&
    css`
      border-color: ${PALETTE.RED_600};
      box-shadow: 0 0 0 1px ${PALETTE.RED_600};
      &: focus {
        box-shadow: 0 0 0 1px ${PALETTE.RED_600};
      }
    `}

  ${props =>
    props.isSubCommentInput &&
    css`
      padding: 0.3rem 1rem;
      height: 4rem;

      &:first-child {
        margin-right: 0.6rem;
      }

      @media all and (max-width: 780px) {
        width: 6rem;
      }
    `}
`;

export const ButtonWrapper = styled.div<{ isSubCommentInput: boolean }>`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;

  & > button {
    height: 3.6rem;
    ${props =>
      props.isSubCommentInput &&
      css`
        padding: 0.3rem 1.2rem;
        line-height: 1.65rem;
        font-size: 1.1rem;
      `}
  }
`;
