import { PALETTE } from "./../../../styles/palette";
import styled, { css } from "styled-components";
import { InputCSS } from "../../../styles/css";
import DeleteButton from "../../atoms/Buttons/DeleteButton";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.6rem;
`;

export const TextBox = styled.div<{ isValidInput: boolean }>`
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
  max-height: 12rem;
  margin-bottom: 0.2rem;
  overflow: auto;

  &:empty:before {
    content: "댓글을 입력해주세요.";
    color: ${PALETTE.GRAY_600};
  }

  &:empty:focus:before {
    content: "";
  }
`;

export const TextCount = styled.span`
  font-size: 1.1rem;
  line-height: 1.65rem;
  margin-left: auto;
  margin-right: 0.6rem;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GuestInfo = styled.input<{ isValidInput: boolean; isSubCommentInput: boolean }>`
  ${InputCSS};
  padding: 1rem 0.8rem;
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
      font-size: 1rem;
      line-height: 1.5rem;
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
    ${props =>
      props.isSubCommentInput &&
      css`
        padding: 0.3rem 1.2rem;
        line-height: 1.65rem;
        font-size: 1.1rem;
      `}
  }
`;

export const CancelButton = styled(DeleteButton)``;
